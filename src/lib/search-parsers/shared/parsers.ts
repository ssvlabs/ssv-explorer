import { parseAsArrayOf, type Options } from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

export const defaultSearchOptions: Options = {
  history: "push",
  shallow: false,
  clearOnDefault: true,
}

export const addressesParser = parseAsArrayOf(
  z.string().refine(isAddress)
).withOptions(defaultSearchOptions)
