"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

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
      const url = endpoint(params.network, "clusters", searchParams)
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

      const operators = response.cluster.operators

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
