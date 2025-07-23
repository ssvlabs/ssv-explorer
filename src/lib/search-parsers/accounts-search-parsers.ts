import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
} from "nuqs/server"
import { z } from "zod"

import type { Account } from "@/types/api/account"
import { networkParser, paginationParser } from "@/lib/search-parsers"
import {
  addressesParser,
  defaultSearchOptions,
} from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const accountsSearchFilters = {
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
  ownerAddress: addressesParser,
}

export const operatorSearchSort = {
  ordering: getSortingStateParser<Account>().withOptions(defaultSearchOptions),
}

export const accountSearchParsers = {
  ...networkParser,
  ...paginationParser,
  ...operatorSearchSort,
  ...accountsSearchFilters,
}
export const accountsSearchParamsCache =
  createSearchParamsCache(accountSearchParsers)

export const accountSearchParamsSerializer = createSerializer(
  accountSearchParsers,
  {
    clearOnDefault: false,
  }
)

export type AccountsSearchSchema = Awaited<
  ReturnType<typeof accountsSearchParamsCache.parse>
>
