import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
} from "nuqs/server"
import { z } from "zod"

import { type Cluster } from "@/types/api"
import { networkParser, paginationParser } from "@/lib/search-parsers"
import {
  addressesParser,
  clustersParser,
  defaultSearchOptions,
} from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"

export const clustersSearchFilters = {
  search: parseAsString.withOptions(defaultSearchOptions),
  clusterId: clustersParser,
  ownerAddress: addressesParser,
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

export type ClusterSearchFilterKeys = keyof typeof clustersSearchFilters

export const defaultClusterSort: ExtendedSortingState<Cluster> = [
  { id: "validatorCount", desc: true },
]

export const clusterSearchSort = {
  ordering: getSortingStateParser<Cluster>().withOptions({
    ...defaultSearchOptions,
    clearOnDefault: false,
  }),
}

export const operatorDetailsFilter = {
  operatorDetails: parseAsBoolean.withDefault(true),
}

export const clustersSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...clustersSearchFilters,
  ...clusterSearchSort,
  ...operatorDetailsFilter,
})
export const clustersSearchParamsSerializer = createSerializer(
  {
    ...networkParser,
    ...paginationParser,
    ...clustersSearchFilters,
    ...clusterSearchSort,
    ...operatorDetailsFilter,
  },
  {
    clearOnDefault: false,
  }
)

export type ClustersSearchSchema = Awaited<
  ReturnType<typeof clustersSearchParamsCache.parse>
>
