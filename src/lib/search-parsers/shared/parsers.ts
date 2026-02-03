import { parseAsArrayOf, type Options } from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { sortNumbers } from "@/lib/utils/number"
import { parseAsTuple } from "@/lib/utils/parsers"
import {
  isClusterId,
  isValidatorPublicKey,
} from "@/components/global-search/search-input-parser"

export const defaultSearchOptions: Options = {
  history: "push",
  shallow: false,
  clearOnDefault: true,
}

export const addressesParser = parseAsArrayOf(
  z.string().refine(isAddress)
).withOptions(defaultSearchOptions)

export const clustersParser = parseAsArrayOf(
  z.string().refine(isClusterId)
).withOptions(defaultSearchOptions)

export const publicKeysParser = parseAsArrayOf(
  z.string().refine(isValidatorPublicKey)
).withOptions(defaultSearchOptions)

export const numberRangeParser = parseAsTuple(
  z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
  {
    postParse: sortNumbers,
  }
).withOptions({
  ...defaultSearchOptions,
  throttleMs: 500,
})

export const effectiveBalanceParser = parseAsTuple(
  z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
  {
    postParse: sortNumbers,
  }
)
  .withDefault([0, 25000])
  .withOptions(defaultSearchOptions)
