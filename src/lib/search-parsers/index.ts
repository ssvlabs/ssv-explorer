import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs/server"

import { defaultSearchOptions } from "@/lib/search-parsers/shared/parsers"

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

export const overviewParserCache = createSearchParamsCache({
  ...paginationParser,
})

export const enhancementParsers = {
  includeOperatorData: parseAsStringEnum(["true", "false", "minimal"])
    .withDefault("minimal")
    .withOptions({
      ...defaultSearchOptions,
      clearOnDefault: false,
    }),
}
