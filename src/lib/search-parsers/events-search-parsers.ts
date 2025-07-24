import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsStringEnum,
} from "nuqs/server"

import { type AccountEvent } from "@/types/api/events"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import { defaultSearchOptions } from "@/lib/search-parsers/shared/parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const eventsSearchFilters = {
  entity: parseAsStringEnum(["operator", "cluster", "validator"]),
}

export const defaultEventSort: ExtendedSortingState<AccountEvent> = [
  { id: "createdAt", desc: true },
]

export const eventSearchSort = {
  ordering: getSortingStateParser<AccountEvent>()
    .withOptions(defaultSearchOptions)
    .withDefault(defaultEventSort),
}

export const eventsSearchParsers = {
  ...networkParser,
  ...paginationParser,
  ...eventsSearchFilters,
  ...enhancementParsers,
  ...eventSearchSort,
}
export const eventsSearchParamsCache =
  createSearchParamsCache(eventsSearchParsers)

export const eventsSearchParamsSerializer = createSerializer(
  eventsSearchParsers,
  {
    clearOnDefault: false,
  }
)

export type EventsSearchSchema = Awaited<
  ReturnType<typeof eventsSearchParamsCache.parse>
>
