import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import type { Account } from "@/types/api/account"
import { networkParser, paginationParser } from "@/lib/search-parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const accountsSearchFilters = {
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    searchOptions
  ),
}

export const operatorSearchSort = {
  ordering: getSortingStateParser<Account>().withOptions(searchOptions),
}

export const accountsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...operatorSearchSort,
  ...accountsSearchFilters,
})

export const accountSearchParamsSerializer = createSerializer(
  {
    ...networkParser,
    ...paginationParser,
    ...operatorSearchSort,
    ...accountsSearchFilters,
  },
  {
    clearOnDefault: false,
  }
)

export type AccountsSearchSchema = Awaited<
  ReturnType<typeof accountsSearchParamsCache.parse>
>
