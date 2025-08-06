import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"

export const ogSearchParser = {
  id: parseAsInteger,
  name: parseAsString,
  "24h": parseAsFloat,
  "30d": parseAsFloat,
  logo: parseAsString,
  validators_count: parseAsInteger,
  is_private: parseAsBoolean,
  is_verified: parseAsBoolean,
}

export const ogSearchParserCache = createSearchParamsCache(ogSearchParser)

export type OgSearchParser = Awaited<
  ReturnType<typeof ogSearchParserCache.parse>
>
