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

export const searchOperators = async (
  params: Partial<OperatorsSearchSchema> & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      const searchParams = operatorSearchParamsSerializer(params)
      const url = endpoint(params.network, "operators", searchParams)
      const response = await api.get<OperatorsSearchResponse>(url)

      // Fetch performance v2 data for each operator
      const operatorsWithPerformanceV2 = await Promise.allSettled(
        response.operators.map(async (operator) => {
          try {
            const performanceData = await getOperatorPerformanceV2({
              network: params.network,
              operatorId: operator.id,
            })
            return {
              ...addFallbackOperatorName(operator),
              performanceV2: performanceData,
            }
          } catch (error) {
            return addFallbackOperatorName(operator)
          }
        })
      )

      const operators = operatorsWithPerformanceV2
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return result.value
          } else {
            const operator = response.operators[index]
            return operator ? addFallbackOperatorName(operator) : null
          }
        })
        .filter((operator): operator is Operator => operator !== null)

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
  params: { network: ChainName } & { id: number }
) => {
  return await unstable_cache(
    async () => {
      const url = endpoint(params.network, "operators", params.id)
      const operator = await api
        .get<Operator>(url)
        .then(addFallbackOperatorName)

      try {
        const performanceData = await getOperatorPerformanceV2({
          network: params.network,
          operatorId: params.id,
        })

        return {
          ...operator,
          performanceV2: performanceData,
        }
      } catch (error) {
        return operator
      }
    },
    [JSON.stringify(params)],
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

export interface OperatorPerformanceV2 {
  operatorId: number
  dailyPerformance: number
  monthlyPerformance: number
}

export const getOperatorPerformanceV2 = async (params: {
  network: ChainName
  operatorId: number
}) => {
  return await unstable_cache(
    async () => {
      const url = endpoint(
        params.network,
        `duties/operator/${params.operatorId}/performanceV2`
      )
      try {
        const result = await api.get<OperatorPerformanceV2>(url)
        return result
      } catch (error) {
        console.error("Error fetching performance v2:", error)
        throw error
      }
    },
    [JSON.stringify(params)],
    {
      revalidate: 30,
      tags: ["operator-performance-v2"],
    }
  )()
}

export const getOperatorPerformanceChart = async (params: {
  network: ChainName
  operatorId: number
  points?: number
  type?: "daily" | "hourly"
}) =>
  await unstable_cache(
    async () => {
      const searchParams = new URLSearchParams()
      if (params.points) {
        searchParams.set("points", params.points.toString())
      }
      if (params.type) {
        searchParams.set("type", params.type.toString())
      }

      const url = endpoint(
        params.network,
        `duties/operator/${params.operatorId}/performance-chart`,
        searchParams.size ? `?${searchParams.toString()}` : ""
      )
      return await api.get<OperatorPerformanceChart>(url)
    },
    [JSON.stringify(params)],
    {
      revalidate: 30,
      tags: ["operator-performance-chart"],
    }
  )()
