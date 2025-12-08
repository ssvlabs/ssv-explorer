"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { getOperatorPerformanceV2 } from "@/api/operator"

import type {
  GetClusterResponse,
  Operator,
  PaginatedClustersResponse,
} from "@/types/api"
import { type ChainName } from "@/config/chains"
import {
  clustersSearchParamsSerializer,
  type ClustersSearchSchema,
} from "@/lib/search-parsers/clusters-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchClusters = async <
  T extends (Operator | number)[] = number[],
>(
  params: Partial<ClustersSearchSchema> & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      const searchParams = clustersSearchParamsSerializer(params)
      const url = endpoint(params.network, "clusters", `?${searchParams}`)
      return await api.get<PaginatedClustersResponse<T>>(url)
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["clusters"],
    }
  )()

export const getCluster = async (
  params: { network: ChainName } & { id: string }
) =>
  await unstable_cache(
    async () => {
      const response = await api.get<GetClusterResponse<Operator[]>>(
        endpoint(params.network, "clusters", params.id, "?operatorDetails=true")
      )
      if (!response.cluster) {
        throw new Error("Cluster not found")
      }

      // Fetch performance v2 data for each operator
      const operatorsWithPerformanceV2 = await Promise.allSettled(
        response.cluster.operators.map(async (operator) => {
          try {
            const performanceData = await getOperatorPerformanceV2({
              network: params.network,
              operatorId: operator.id,
            })
            return {
              ...operator,
              performanceV2: performanceData,
            }
          } catch (error) {
            return operator
          }
        })
      )

      const operators = operatorsWithPerformanceV2
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return result.value
          } else {
            const operator = response.cluster.operators[index]
            return operator || null
          }
        })
        .filter((operator): operator is Operator => operator !== null)

      return {
        ...response.cluster,
        operators,
      }
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["cluster"],
    }
  )()

export const getClusterEffectiveBalance = async (
  params: { network: ChainName } & { id: string }
) =>
  await unstable_cache(
    async () => {
      const response = await api.get<{
        clusterId: string
        effectiveBalance: string
      }>(
        endpoint(params.network, "clusters", params.id, "totalEffectiveBalance")
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["cluster-effective-balance"],
    }
  )()
