import { searchValidators } from "@/api/validators"
import { useInfiniteQuery } from "@tanstack/react-query"

import { type ValidatorsSearchSchema } from "@/lib/search-parsers/validators-search-parsers"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useValidatorsInfiniteQuery = (
  params: Pick<ValidatorsSearchSchema, "perPage" | "search"> & {
    enabled?: boolean
  }
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["validators", params.search, chain.chainId],
    queryFn: ({ pageParam = 1 }) =>
      searchValidators({
        network: chain.name,
        page: pageParam ?? 1,
        perPage: params.perPage,
        search: params.search,
        fullOperatorData: false,
      }),
    select: (data) => data.pages.flatMap((page) => page.validators),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination
      return page < pages ? page + 1 : undefined
    },
    enabled: !!params.search && params.enabled,
  })
}
