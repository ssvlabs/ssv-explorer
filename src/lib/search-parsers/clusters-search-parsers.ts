import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { type Cluster } from "@/types/api"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"

const searchOptions: Options = {
  history: "push",
  shallow: false,
  clearOnDefault: true,
}

export const clustersSearchFilters = {
  search: parseAsString.withOptions(searchOptions),
  clusterId: parseAsArrayOf(z.string()).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    searchOptions
  ),
  status: parseAsBoolean.withOptions(searchOptions),
  isLiquidated: parseAsBoolean.withOptions(searchOptions),
  operators: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    searchOptions
  ),
  createdAt: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  ).withOptions(searchOptions),
  operatorDetails: parseAsBoolean.withOptions(searchOptions).withDefault(true),
}

export const defaultClusterSort: ExtendedSortingState<Cluster> = [
  { id: "validatorCount", desc: true },
]

export const clusterSearchSort = {
  ordering: getSortingStateParser<Cluster>().withOptions({
    ...searchOptions,
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
