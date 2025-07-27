"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { type Address } from "abitype"

import { type PaginatedEventsResponse } from "@/types/api/events"
import {
  eventsSearchParamsSerializer,
  type EventsSearchSchema,
} from "@/lib/search-parsers/events-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getAccountEvents = async (
  params: Partial<EventsSearchSchema> &
    Pick<EventsSearchSchema, "network"> & { ownerAddress: Address }
) =>
  await unstable_cache(
    async () => {
      const searchParams = eventsSearchParamsSerializer(params)
      const response = await api.get<PaginatedEventsResponse>(
        endpoint(
          params.network,
          "events/ownerAddress",
          params.ownerAddress,
          `?${searchParams}`
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
