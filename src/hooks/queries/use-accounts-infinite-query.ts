import { searchAccounts } from "@/api/account"
import { useInfiniteQuery } from "@tanstack/react-query"

import { type AccountsSearchSchema } from "@/lib/search-parsers/accounts-search-parsers"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useAccountsInfiniteQuery = (
  params: Pick<AccountsSearchSchema, "perPage"> & {
    search?: string
    enabled?: boolean
  }
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["accounts", params.search, chain.id],
    queryFn: ({ pageParam = 1 }) =>
      searchAccounts({
        network: chain.name,
        page: pageParam ?? 1,
        perPage: params.perPage,
        searchOwnerAddress: params.search,
      }),
    select: (data) => data.pages.flatMap((page) => page.accounts),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination
      return page < pages ? page + 1 : undefined
    },
    enabled: !!params.search && params.enabled,
  })
}
