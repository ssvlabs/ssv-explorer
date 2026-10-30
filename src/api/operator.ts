"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import type {
  Country,
  Operator,
  OperatorPerformanceChart,
  OperatorsSearchResponse,
} from "@/types/api"
import { type ChainName } from "@/config/chains"
import {
  operatorPerformanceChartParamsSerializer,
  type OperatorPerformanceChartParams,
} from "@/lib/search-parsers/operator-performance-chart-parsers"
import {
  operatorSearchParamsSerializer,
  type OperatorsSearchSchema,
} from "@/lib/search-parsers/operator-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { addFallbackOperatorName } from "@/lib/utils/operator"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export type OrderBy =
  | "name"
  | "id"
  | "validators_count"
  | "performance.30d"
  | "fee"
  | "mev"
export type Sort = "asc" | "desc"

export type SearchOperatorsParams = {
  search?: string
  ordering?: `${OrderBy}:${Sort}`
  type?: "verified_operator"
  has_dkg_address?: boolean
  page?: number
  perPage?: number
}

/**
 * Opt-in query param understood by ssv-api: when sent, operators removed
 * on-chain (`is_deleted: true`, `status: "Removed"`) are returned instead of
 * being filtered out (lists) or answered with 404 (single lookups). Callers
 * that don't pass `includeDeleted` keep the default behaviour.
 */
const INCLUDE_DELETED_PARAM = "includeDeleted=true"

const withIncludeDeleted = (searchParams: string) =>
  searchParams
    ? `${searchParams}&${INCLUDE_DELETED_PARAM}`
    : `?${INCLUDE_DELETED_PARAM}`

export const searchOperators = async (
  params: Partial<OperatorsSearchSchema> & {
    network: ChainName
    /** Also return removed operators. Not part of the shared URL parsers on purpose: only global search opts in. */
    includeDeleted?: boolean
  }
) =>
  await unstable_cache(
    async () => {
      const serialized = operatorSearchParamsSerializer(params)
      const searchParams = params.includeDeleted
        ? withIncludeDeleted(serialized)
        : serialized
      const url = endpoint(params.network, "operators", searchParams)
      const response = await api.get<OperatorsSearchResponse>(url)

      const operators = response.operators.map(addFallbackOperatorName)

      return {
        operators,
        pagination: response.pagination,
      }
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["operators"],
    }
  )()

export interface OperatorMetadata {
  operatorName: string
  description: string
  location: string
  setupProvider: string
  eth1NodeClient: string
  eth2NodeClient: string
  mevRelays: string
  websiteUrl: string
  twitterUrl: string
  linkedinUrl: string
  dkgAddress: string
  logo: string
  signature: string
}

export const getOperator = async (
  params: { network: ChainName } & {
    id: number
    /** Return a removed operator (`is_deleted: true`) instead of a 404. */
    includeDeleted?: boolean
  }
) => {
  const includeDeleted = Boolean(params.includeDeleted)
  return await unstable_cache(
    async () => {
      const url = includeDeleted
        ? endpoint(
            params.network,
            "operators",
            params.id,
            withIncludeDeleted("")
          )
        : endpoint(params.network, "operators", params.id)
      const operator = await api
        .get<Operator>(url)
        .then(addFallbackOperatorName)

      return operator
    },
    // Normalized key so every caller with the same inputs shares one cache entry
    // regardless of object key order.
    [
      JSON.stringify({
        network: params.network,
        id: params.id,
        includeDeleted,
      }),
    ],
    {
      revalidate: 30,
      tags: ["operators"],
    }
  )()
}

export const getOperatorLocations = async (chain: ChainName) => {
  return await unstable_cache(
    async () => api.get<Country[]>(endpoint(chain, "operators/locations")),
    [chain.toString()],
    {
      revalidate: 30,
      tags: ["operator-locations"],
    }
  )()
}

interface NodeClientsResponse {
  ETH1_NODE: string[]
  ETH2_NODE: string[]
  SSV_NODE: string[]
}

export const getOperatorNodeClients = async (chain: ChainName) => {
  return await unstable_cache(
    async () => {
      const url = endpoint(chain, "operators/nodes/all")
      const response = await api.get<NodeClientsResponse>(url)

      return {
        eth1: response.ETH1_NODE,
        eth2: response.ETH2_NODE,
        ssvClient: response.SSV_NODE,
      }
    },
    [chain.toString()],
    {
      revalidate: 300, // Cache for 5 minutes
      tags: ["operator-node-clients"],
    }
  )()
}

export const getOperatorPerformanceChart = async (
  params: {
    network: ChainName
    operatorId: number
  } & Partial<OperatorPerformanceChartParams>
) =>
  await unstable_cache(
    async () => {
      const searchParams = operatorPerformanceChartParamsSerializer({
        points: params.points,
        type: params.type,
      })

      const url = endpoint(
        params.network,
        `duties/operator/${params.operatorId}/performance-chart`,
        searchParams ? `?${searchParams}` : ""
      )
      return await api.get<OperatorPerformanceChart>(url)
    },
    [JSON.stringify(params)],
    {
      revalidate: 30,
      tags: ["operator-performance-chart"],
    }
  )()
