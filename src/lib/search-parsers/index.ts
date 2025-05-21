import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
} from "nuqs/server"

import { type ChainTuple } from "@/config/chains"
import { parseAsNumberEnum } from "@/lib/utils/parsers"
import { networks } from "@/lib/utils/ssv-network-details"

export const networkParser = {
  network: parseAsNumberEnum(
    networks.map((n) => n.networkId) as ChainTuple
  ).withDefault(networks[0]!.networkId as ChainTuple[number]),
}

export const networkParserCache = createSearchParamsCache(networkParser)

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

export const overviewParserCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
})

export const enhancementParsers = {
  fullOperatorData: parseAsBoolean.withDefault(true),
}
