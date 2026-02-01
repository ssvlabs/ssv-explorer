import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"
import { z } from "zod"

import { type Operator, type SearchValidator } from "@/types/api"
import { enhancementParsers, paginationParser } from "@/lib/search-parsers"
import {
  addressesParser,
  clustersParser,
  defaultSearchOptions,
  publicKeysParser,
} from "@/lib/search-parsers/shared/parsers"
import { sortNumbers } from "@/lib/utils/number"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"
import {
  validatorStatusApiParams,
  type ValidatorStatusApiParam,
} from "@/lib/utils/validator-status-mapping"

export const validatorsSearchFilters = {
  search: parseAsString.withOptions(defaultSearchOptions),
  publicKey: publicKeysParser,
  cluster: clustersParser,
  ownerAddress: addressesParser,
  operator: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
  updatedAt: parseAsInteger,
  status: parseAsArrayOf(
    parseAsStringEnum<ValidatorStatusApiParam>(validatorStatusApiParams)
  )
    .withDefault([])
    .withOptions(defaultSearchOptions),
  dateRange: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: sortNumbers,
    }
  ).withOptions(defaultSearchOptions),
  effectiveBalance: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: sortNumbers,
    }
  )
    .withDefault([0, 25000])
    .withOptions(defaultSearchOptions),
}

export type ValidatorSearchFilterKeys = keyof typeof validatorsSearchFilters

export const defaultValidatorSort: ExtendedSortingState<
  SearchValidator<Operator>
> = [{ id: "created_at", desc: true }]

export const validatorSearchSort = {
  orderBy: getSortingStateParser<SearchValidator<Operator>>()
    .withOptions(defaultSearchOptions)
    .withDefault(defaultValidatorSort),
}

export const elasticSearchParsers = {
  lastId: parseAsString,
  pageDirection: parseAsStringEnum<"next" | "prev">([
    "next",
    "prev",
  ]).withDefault("prev"),
}

export const validatorsSearchParsers = {
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
