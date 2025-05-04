import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { networkParser, paginationParser } from "@/lib/search-parsers"
import { getBlockFee, MEV_RELAYS_VALUES } from "@/lib/utils/operator"
import { getSortingStateParser, parseAsTuple } from "@/lib/utils/parsers"

import { type OperatorSortingKeys } from "../../types/api/operator"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: false,
}

export const operatorSearchFilters = {
  search: parseAsString.withDefault("").withOptions(searchOptions),
  id: parseAsArrayOf(z.number({ coerce: true }))
    .withDefault([])
    .withOptions(searchOptions),
  name: parseAsArrayOf(z.string()).withDefault([]).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress))
    .withDefault([])
    .withOptions(searchOptions),
  location: parseAsArrayOf(z.string()).withOptions(searchOptions),
  eth1: parseAsArrayOf(z.string()).withDefault([]).withOptions(searchOptions),
  eth2: parseAsArrayOf(z.string()).withDefault([]).withOptions(searchOptions),
  mev: parseAsArrayOf(z.enum(MEV_RELAYS_VALUES))
    .withDefault([])
    .withOptions(searchOptions),
  fee: parseAsTuple(
    [
      z
        .number({ coerce: true })
        .transform((v) => getBlockFee(v)) as unknown as z.ZodNumber,
      z
        .number({ coerce: true })
        .transform((v) => getBlockFee(v)) as unknown as z.ZodNumber,
    ],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
  validatorsCount: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 1000])
    .withOptions(searchOptions),
  managedEth: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 0])
    .withOptions(searchOptions),
  status: parseAsArrayOf(
    z.enum(["active", "inactive", "no validators", "invalid"])
  )
    .withDefault([])
    .withOptions(searchOptions),
  isPrivate: parseAsBoolean.withOptions(searchOptions),
  type: parseAsStringEnum([
    "verified_operator",
    "dapp_node",
    "operator",
  ]).withOptions(searchOptions),

  performance24h: parseAsTuple(
    [
      z.number({ coerce: true }).transform((v) => Math.round(v)),
      z.number({ coerce: true }).transform((v) => Math.round(v)),
    ],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions(searchOptions),
  performance30d: parseAsTuple(
    [
      z.number({ coerce: true }).transform((v) => Math.round(v)),
      z.number({ coerce: true }).transform((v) => Math.round(v)),
    ],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions(searchOptions),
}

export const defaultOperatorSort: ExtendedSortingState<OperatorSortingKeys> = [
  { id: "id", desc: true },
]
export const operatorSearchSort = {
  ordering: getSortingStateParser<OperatorSortingKeys>()
    .withDefault(defaultOperatorSort)
    .withOptions(searchOptions),
}

export const operatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...operatorSearchFilters,
  ...operatorSearchSort,
})

export const operatorSearchParamsSerializer = createSerializer(
  {
    ...networkParser,
    ...paginationParser,
    ...operatorSearchFilters,
    ...operatorSearchSort,
  },
  {
    clearOnDefault: false,
  }
)

export type OperatorsSearchSchema = Awaited<
  ReturnType<typeof operatorsSearchParamsCache.parse>
>
