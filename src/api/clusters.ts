"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import type {
  GetClusterResponse,
  Operator,
  PaginatedClustersResponse,
} from "@/types/api"
import {
  clustersSearchParamsSerializer,
  type ClustersSearchSchema,
} from "@/lib/search-parsers/clusters-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchClusters = async <
  T extends (Operator | number)[] = number[],
>(
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const searchParams = clustersSearchParamsSerializer(params)
      return await api.get<PaginatedClustersResponse<T>>(
        endpoint(params.network, "clusters", `?${searchParams}`)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["clusters"],
    }
  )()

export const getCluster = async (
  params: Pick<ClustersSearchSchema, "network"> & { id: string }
) =>
  await unstable_cache(
    async () => {
      const response = await api.get<GetClusterResponse<Operator[]>>(
        endpoint(params.network, "clusters", params.id, "?operatorDetails=true")
      )
      if (!response.cluster) {
        throw new Error("Cluster not found")
      }
      return response.cluster
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["cluster"],
    }
  )()
