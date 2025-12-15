import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"
import { z } from "zod"

import { paginationParser } from "@/lib/search-parsers"
import {
  addressesParser,
  defaultSearchOptions,
} from "@/lib/search-parsers/shared/parsers"
import { MEV_RELAYS_VALUES, STATUS_API_VALUES } from "@/lib/utils/operator"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"

import { type OperatorSortingKeys } from "../../types/api/operator"
import { sortNumbers } from "../utils/number"

export const operatorSearchFilters = {
  search: parseAsString.withDefault("").withOptions(defaultSearchOptions),
  id: parseAsArrayOf(z.number({ coerce: true }))
    .withDefault([])
    .withOptions(defaultSearchOptions),
  name: parseAsArrayOf(z.string())
    .withDefault([])
    .withOptions(defaultSearchOptions),
  ownerAddress: addressesParser,
  location: parseAsArrayOf(z.string()).withOptions(defaultSearchOptions),
  eth1: parseAsArrayOf(z.string())
    .withDefault([])
    .withOptions(defaultSearchOptions),
  eth2: parseAsArrayOf(z.string())
    .withDefault([])
    .withOptions(defaultSearchOptions),
  ssvClient: parseAsArrayOf(z.string())
    .withDefault([])
    .withOptions(defaultSearchOptions),
  mev: parseAsArrayOf(z.enum(MEV_RELAYS_VALUES))
    .withDefault([])
    .withOptions(defaultSearchOptions),
  fee: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: sortNumbers,
    }
  )
    .withDefault([0, 200])
    .withOptions({
      ...defaultSearchOptions,
      throttleMs: 500,
    }),
  validatorsCount: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: sortNumbers,
    }
  )
    .withDefault([0, 3000])
    .withOptions(defaultSearchOptions),
  managedEth: parseAsTuple(
    z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
    {
      postParse: sortNumbers,
    }
  )
    .withDefault([0, 0])
    .withOptions(defaultSearchOptions),
  status: parseAsArrayOf(z.enum(STATUS_API_VALUES))
    .withDefault([])
    .withOptions(defaultSearchOptions),
  isPrivate: parseAsBoolean.withOptions(defaultSearchOptions),
  type: parseAsStringEnum([
    "verified_operator",
    "dapp_node",
    "operator",
  ]).withOptions(defaultSearchOptions),

  performance24h: parseAsTuple(
    z.tuple([
      z.number({ coerce: true }).transform((v) => Math.round(v)),
      z.number({ coerce: true }).transform((v) => Math.round(v)),
    ]),
    {
      postParse: sortNumbers,
    }
  )
    .withDefault([0, 100])
    .withOptions(defaultSearchOptions),
  performance30d: parseAsTuple(
    z.tuple([
      z.number({ coerce: true }).transform((v) => Math.round(v)),
      z.number({ coerce: true }).transform((v) => Math.round(v)),
    ])
  )
    .withDefault([0, 100])
    .withOptions(defaultSearchOptions),
  updatedAt: parseAsInteger,
}

export type OperatorSearchFilterKeys = keyof typeof operatorSearchFilters

export const defaultOperatorSort: ExtendedSortingState<OperatorSortingKeys> = [
  { id: "id", desc: true },
]

export const operatorSearchSort = {
  ordering: getSortingStateParser<OperatorSortingKeys>()
    .withDefault(defaultOperatorSort)
    .withOptions({
      ...defaultSearchOptions,
      clearOnDefault: false,
    }),
}

export const operatorSearchParsers = {
  ...paginationParser,
  ...operatorSearchFilters,
  ...operatorSearchSort,
}
export const operatorsSearchParamsCache = createSearchParamsCache(
  operatorSearchParsers
)

export const operatorSearchParamsSerializer = createSerializer(
  operatorSearchParsers,
  {
    clearOnDefault: false,
  }
)

export type OperatorsSearchSchema = Awaited<
  ReturnType<typeof operatorsSearchParamsCache.parse>
>
