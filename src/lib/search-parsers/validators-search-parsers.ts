import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"
import { z } from "zod"

import { type Operator, type SearchValidator } from "@/types/api"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import {
  addressesParser,
  defaultSearchOptions,
} from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const validatorsSearchFilters = {
  search: parseAsString.withOptions(defaultSearchOptions),
  publicKey: parseAsArrayOf(z.string()).withOptions(defaultSearchOptions),
  cluster: parseAsArrayOf(z.string()).withOptions(defaultSearchOptions),
  ownerAddress: addressesParser.withDefault([]),
  operator: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
}

export const defaultValidatorSort: ExtendedSortingState<
  SearchValidator<Operator>
> = [{ id: "created_at", desc: true }]

export const validatorSearchSort = {
  ordering: getSortingStateParser<SearchValidator<Operator>>()
    .withOptions(defaultSearchOptions)
    .withDefault(defaultValidatorSort),
}

export const elasticSearchParsers = {
  lastId: parseAsString,
  pageDirection: parseAsStringEnum<"next" | "prev">(["next", "prev"]),
}

export const validatorsSearchParsers = {
  ...networkParser,
  ...paginationParser,
  ...validatorsSearchFilters,
  ...enhancementParsers,
  ...validatorSearchSort,
  ...elasticSearchParsers,
}
export const validatorsSearchParamsCache = createSearchParamsCache(
  validatorsSearchParsers
)

export const validatorsSearchParamsSerializer = createSerializer(
  validatorsSearchParsers,
  {
    clearOnDefault: false,
  }
)

export type ValidatorsSearchSchema = Awaited<
  ReturnType<typeof validatorsSearchParamsCache.parse>
>
