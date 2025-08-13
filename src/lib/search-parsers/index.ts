import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
} from "nuqs/server"

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

export const overviewParserCache = createSearchParamsCache({
  ...paginationParser,
})

export const enhancementParsers = {
  fullOperatorData: parseAsBoolean.withDefault(true),
}
