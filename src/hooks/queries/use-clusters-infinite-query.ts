import { searchClusters } from "@/api/clusters"
import { useInfiniteQuery } from "@tanstack/react-query"

import { type ChainName } from "@/config/chains"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search-parsers"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useClustersInfiniteQuery = (
  params: Pick<ClustersSearchSchema, "perPage" | "search"> & {
    enabled?: boolean
  }
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["clusters", params.search],
    queryFn: ({ pageParam = 1 }) =>
      searchClusters({
        network: chain.name as ChainName,
        page: pageParam ?? 1,
        perPage: params.perPage,
        search: params.search,
      }),
    select: (data) => data.pages.flatMap((page) => page.clusters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination
      return page < pages ? page + 1 : undefined
    },
    enabled: !!params.search && params.enabled,
  })
}
