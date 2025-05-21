import { searchOperators } from "@/api/operator"
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"

import { type OperatorsSearchSchema } from "@/lib/search-parsers/operator-search-parsers"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useOperatorsInfiniteQuery = (
  params: Pick<OperatorsSearchSchema, "search" | "perPage">
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["operators", params.search],
    queryFn: ({ pageParam = 1 }) =>
      searchOperators({
        network: chain.chainId,
        page: pageParam ?? 1,
        perPage: params.perPage,
        search: params.search,
      }),
    select: (data) => data.pages.flatMap((page) => page.operators),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination
      return page < pages ? page + 1 : undefined
    },
    enabled: !!params.search,
  })
}
