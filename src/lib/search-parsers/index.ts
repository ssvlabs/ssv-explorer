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

interface OperatorQueryParams {
  id?: string // ArrayQueryParam 1,2,3
  name?: string // ArrayQueryParam Operator1,Operator2,Operator3
  owner_address?: string // ArrayQueryParam 0x123,0x456,0x789
  location?: string // ArrayQueryParam USA,EU,ASIA
  eth1?: string // ArrayQueryParam Geth,Besu,Erigon
  eth2?: string // ArrayQueryParam Lighthouse,Nimbus,Teku
  mev?: string // ArrayQueryParam mevName,mevName2,mevName3
  fee?: string // TupleQueryParam 1,2 as a range [number,number]
  validatorsCount?: string // TupleQueryParam 1,500 as a range [number,number]
  performance24h?: string // TupleQueryParam 1,100 as a range [number,number]
  performance30d?: string // TupleQueryParam 1,100 as a range [number,number]
  status?: "active" | "inactive" | "invalid"
  type?: "verified_operator" | "dapp_node" | "operator"
  private?: boolean
  ordering?: `${"fee" | "validatorsCount" | "performance" | "registration_date"}:${"asc" | "desc"}` // "registration_date:desc"
}

const a: OperatorQueryParams = {
  id: "1,1,2",
  name: "1,2",
}
