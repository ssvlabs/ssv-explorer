import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsStringEnum,
} from "nuqs/server"

import { type AccountEvent } from "@/types/api/events"
import { paginationParser } from "@/lib/search-parsers"
import { defaultSearchOptions } from "@/lib/search-parsers/shared/parsers"
import { type AccountEventName } from "@/lib/utils/account-events"
import { getSortingStateParser } from "@/lib/utils/parsers"

export const operatorHistoryEventTypes = [
  "OperatorAdded",
  "OperatorRemoved",
  "OperatorFeeDeclared",
  "OperatorFeeExecuted",
  "OperatorFeeDeclarationCancelled",
  "OperatorWithdrawn",
  "OperatorPrivacyStatusUpdated",
  "OperatorMultipleWhitelistUpdated",
  "OperatorMultipleWhitelistRemoved",
  "OperatorWhitelistingContractUpdated",
] as const satisfies readonly AccountEventName[]

export const eventsSearchFilters = {
  entity: parseAsStringEnum(["operator", "cluster", "validator"]).withOptions(
    defaultSearchOptions
  ),
  event: parseAsArrayOf(
    parseAsStringEnum<AccountEventName>([...operatorHistoryEventTypes])
  )
    .withDefault([])
    .withOptions(defaultSearchOptions),
}

export const defaultEventSort: ExtendedSortingState<AccountEvent> = [
  { id: "blockNumber", desc: true },
]

export const eventSearchSort = {
  ordering: getSortingStateParser<AccountEvent>()
    .withOptions(defaultSearchOptions)
    .withDefault(defaultEventSort),
}

export const eventsSearchParsers = {
  ...paginationParser,
  ...eventsSearchFilters,
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
