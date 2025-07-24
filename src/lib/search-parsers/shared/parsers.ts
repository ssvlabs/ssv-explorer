import { parseAsArrayOf, type Options } from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { sortNumbers } from "@/lib/utils/number"
import { parseAsTuple } from "@/lib/utils/parsers"

export const defaultSearchOptions: Options = {
  history: "push",
  shallow: false,
  clearOnDefault: true,
}

export const addressesParser = parseAsArrayOf(
  z.string().refine(isAddress)
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
