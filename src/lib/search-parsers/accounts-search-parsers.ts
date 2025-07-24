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
  numberRangeParser,
} from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const accountsSearchFilters = {
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
  ownerAddress: addressesParser,
  recipientAddress: addressesParser,
  operators: numberRangeParser.withDefault([0, 5000]),
  clusters: numberRangeParser.withDefault([0, 5000]),
  validators: numberRangeParser.withDefault([0, 200000]),
}

export type AccountSearchFilterKeys = keyof typeof accountsSearchFilters

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
