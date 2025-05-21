import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  type Options,
} from "nuqs/server"
import { z } from "zod"

import { DutyEnum, Status, type DutyElement } from "@/types/api/duties"
import { networkParser, paginationParser } from "@/lib/search-parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const dutiesSearchFilters = {
  validatorPublicKey: parseAsString.withOptions(searchOptions),
  status: parseAsArrayOf(z.nativeEnum(Status)).withOptions(searchOptions),
  duty: parseAsArrayOf(z.nativeEnum(DutyEnum)).withOptions(searchOptions),
  epoch: parseAsInteger.withOptions(searchOptions),
  slot: parseAsInteger.withOptions(searchOptions),
}

export const defaultDutiesSort: ExtendedSortingState<DutyElement> = [
  { id: "slot", desc: true },
]

export const dutiesSearchSort = {
  sort: getSortingStateParser<DutyElement>().withOptions(searchOptions),
}

export const dutiesSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...dutiesSearchFilters,
  ...dutiesSearchSort,
})

export type DutiesSearchSchema = Awaited<
  ReturnType<typeof dutiesSearchParamsCache.parse>
>
