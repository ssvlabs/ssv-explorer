"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { omitBy } from "lodash-es"

import type { Operator, PaginatedClustersResponse } from "@/types/api"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { serializeSortingState } from "@/lib/utils/parsers"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchClusters = async <
  T extends (Operator | number)[] = number[],
>(
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        {
          ...params,
          ordering: params.ordering
            ? serializeSortingState(params.ordering)
            : undefined,
        },
        (value) => value === undefined || value === null
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )

      return await api.get<PaginatedClustersResponse<T>>(
        endpoint(params.network, "clusters/explorer", `?${searchParams}`)
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
      const response = await searchClusters<Operator[]>({
        network: params.network,
        clusterId: [params.id],
        perPage: 1,
        fullOperatorData: true,
      })
      if (!response.data[0]) {
        throw new Error("Cluster not found")
      }
      return response.data[0]
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["clusters"],
    }
  )()
