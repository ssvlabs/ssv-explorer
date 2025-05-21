import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { type Operator, type SearchValidator } from "@/types/api"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const validatorsSearchFilters = {
  search: parseAsString.withOptions(searchOptions),
  publicKey: parseAsArrayOf(z.string()).withOptions(searchOptions),
  clusterId: parseAsArrayOf(z.string()).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withDefault([]),
  operators: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    searchOptions
  ),
}

export const defaultValidatorSort: ExtendedSortingState<
  SearchValidator<Operator>
> = [{ id: "created_at", desc: true }]

export const validatorSearchSort = {
  ordering: getSortingStateParser<SearchValidator<Operator>>()
    .withOptions(searchOptions)
    .withDefault(defaultValidatorSort),
}

export const elasticSearchParsers = {
  lastId: parseAsString,
  pageDirection: parseAsStringEnum<"next" | "prev">(["next", "prev"]),
}

export const validatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...validatorsSearchFilters,
  ...enhancementParsers,
  ...validatorSearchSort,
  ...elasticSearchParsers,
})

export type ValidatorsSearchSchema = Awaited<
  ReturnType<typeof validatorsSearchParamsCache.parse>
>
