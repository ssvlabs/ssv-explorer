import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { type Cluster } from "@/types/api"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import { defaultSearchOptions } from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"

export const clustersSearchFilters = {
  search: parseAsString.withOptions(defaultSearchOptions),
  clusterId: parseAsArrayOf(z.string()).withOptions(defaultSearchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    defaultSearchOptions
  ),
  status: parseAsBoolean.withOptions(defaultSearchOptions),
  isLiquidated: parseAsBoolean.withOptions(defaultSearchOptions),
  operators: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    defaultSearchOptions
  ),
  createdAt: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: (values) => values.sort((a, b) => +a - +b),
    }
  ).withOptions(defaultSearchOptions),
  operatorDetails: parseAsBoolean
    .withOptions(defaultSearchOptions)
    .withDefault(true),
}

export const defaultClusterSort: ExtendedSortingState<Cluster> = [
  { id: "validatorCount", desc: true },
]

export const clusterSearchSort = {
  ordering: getSortingStateParser<Cluster>().withOptions({
    ...defaultSearchOptions,
    clearOnDefault: false,
  }),
}

export const clustersSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...clustersSearchFilters,
  ...clusterSearchSort,
  ...enhancementParsers,
})
export const clustersSearchParamsSerializer = createSerializer(
  {
    ...networkParser,
    ...paginationParser,
    ...clustersSearchFilters,
    ...clusterSearchSort,
    ...enhancementParsers,
  },
  {
    clearOnDefault: false,
  }
)

export type ClustersSearchSchema = Awaited<
  ReturnType<typeof clustersSearchParamsCache.parse>
>
