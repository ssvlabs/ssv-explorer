"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { type Address } from "abitype"

import {
  type AllOperatorEventsResponse,
  type PaginatedEventsResponse,
} from "@/types/api/events"
import { type ChainName } from "@/config/chains"
import {
  eventsSearchParamsSerializer,
  type EventsSearchSchema,
} from "@/lib/search-parsers/events-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getAccountEvents = async (
  params: Partial<EventsSearchSchema> & { network: ChainName } & {
    ownerAddress: Address
  }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<PaginatedEventsResponse>(
        endpoint(
          params.network,
          "events/ownerAddress",
          params.ownerAddress,
          searchParams
        )
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["events"],
    }
  )()

export const getRecentSSVEvents = async (
  params: Partial<EventsSearchSchema> & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<PaginatedEventsResponse>(
        endpoint(params.network, "events", `?${searchParams}`)
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["recent-ssv-events"],
    }
  )()

export const getValidatorEvents = async (
  params: Partial<EventsSearchSchema> & {
    network: ChainName
    publicKey: string
  }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<PaginatedEventsResponse>(
        endpoint(
          params.network,
          "events",
          "validator",
          params.publicKey,
          searchParams
        )
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: [`validator-events-${params.publicKey}`],
    }
  )()

export const getClusterEvents = async (
  params: Partial<EventsSearchSchema> & {
    network: ChainName
    clusterHash: string
  }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<PaginatedEventsResponse>(
        endpoint(
          params.network,
          "events",
          "cluster",
          params.clusterHash,
          searchParams
        )
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: [`cluster-events-${params.clusterHash}`],
    }
  )()

export const getOperatorHistoryEvents = async (
  params: Partial<EventsSearchSchema> & {
    network: ChainName
    operatorId: string
  }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<AllOperatorEventsResponse>(
        endpoint(
          params.network,
          "events",
          "operator",
          params.operatorId,
          `?${searchParams}`
        )
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: [`operator-events-${params.operatorId}`],
    }
  )()
