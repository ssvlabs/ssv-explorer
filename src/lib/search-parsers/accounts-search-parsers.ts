import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server"
import { z } from "zod"

import type { Account } from "@/types/api/account"
import { paginationParser } from "@/lib/search-parsers"
import {
  addressesParser,
  defaultSearchOptions,
  numberRangeParser,
} from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const accountsSearchFilters = {
  searchOwnerAddress: parseAsString
    .withDefault("")
    .withOptions(defaultSearchOptions),
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
  ownerAddress: addressesParser,
  recipientAddress: addressesParser,
  operators: numberRangeParser.withDefault([0, 5000]),
  clusters: numberRangeParser.withDefault([0, 5000]),
  validators: numberRangeParser.withDefault([0, 200000]),
  effectiveBalance: numberRangeParser.withDefault([0, 500 * 2048]),
}

export type AccountSearchFilterKeys = keyof typeof accountsSearchFilters

export const accountSearchSort = {
  ordering: getSortingStateParser<Account>().withOptions(defaultSearchOptions),
}

export const accountSearchParsers = {
  ...paginationParser,
  ...accountSearchSort,
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
