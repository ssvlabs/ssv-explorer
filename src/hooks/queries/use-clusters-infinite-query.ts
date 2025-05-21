import { searchClusters } from "@/api/clusters"
import { useInfiniteQuery } from "@tanstack/react-query"

import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search-parsers"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useClustersInfiniteQuery = (
  params: Pick<ClustersSearchSchema, "perPage" | "search">
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["clusters", params.search],
    queryFn: ({ pageParam = 1 }) =>
      searchClusters({
        network: chain.chainId,
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
    enabled: !!params.search,
  })
}
