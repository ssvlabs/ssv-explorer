import {
  createSearchParamsCache,
  parseAsArrayOf,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { networkParser, paginationParser } from "@/lib/search-parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const accountsSearchFilters = {
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    searchOptions
  ),
  recipientAddress: parseAsArrayOf(z.string()).withOptions(searchOptions),
  version: parseAsArrayOf(z.string()).withOptions(searchOptions),
}

export const accountsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...accountsSearchFilters,
})

export type AccountsSearchSchema = Awaited<
  ReturnType<typeof accountsSearchParamsCache.parse>
>
