import { formatUnits, parseEther } from "viem"

import type { Operator } from "@/types/api"
import { globals } from "@/config/globals"
import { roundOperatorFee } from "@/lib/utils/bigint"
import { ethFormatter, sortNumbers } from "@/lib/utils/number"

type GetYearlyFeeOpts = {
  format?: boolean
}

export function getYearlyFee(fee: bigint, opts: { format: true }): string
export function getYearlyFee(fee: bigint, opts?: GetYearlyFeeOpts): bigint
export function getYearlyFee(
  fee: bigint,
  opts?: GetYearlyFeeOpts
): string | bigint {
  const yearlyFee = fee * BigInt(globals.BLOCKS_PER_YEAR)
  if (opts?.format)
    return ethFormatter.format(+formatUnits(yearlyFee, 18)) + " SSV"
  return yearlyFee
}

export function getBlockFee(yearlyFee: number): string {
  return roundOperatorFee(
    parseEther(yearlyFee.toString()) / BigInt(globals.BLOCKS_PER_YEAR)
  ).toString()
}

export const getMevRelaysAmount = (mev?: string) =>
  mev ? mev.split(",").filter((item: string) => item).length : 0

export const MEV_RELAYS_VALUES = [
  "Aestus",
  "Agnostic Gnosis",
  "bloXroute Max Profit",
  "bloXroute Regulated",
  "Eden Network",
  "Flashbots",
  "Manifold",
  "Titan Relay",
  "Ultra Sound",
] as const

export type MevRelay = (typeof MEV_RELAYS_VALUES)[number]

export const MEV_RELAYS_MAP = {
  AESTUS: MEV_RELAYS_VALUES[0],
  AGNOSTIC: MEV_RELAYS_VALUES[1],
  BLOXROUTE_MAX_PROFIT: MEV_RELAYS_VALUES[2],
  BLOXROUTE_REGULATED: MEV_RELAYS_VALUES[3],
  EDEN: MEV_RELAYS_VALUES[4],
  FLASHBOTS: MEV_RELAYS_VALUES[5],
  MANIFOLD: MEV_RELAYS_VALUES[6],
  TITAN: MEV_RELAYS_VALUES[7],
  ULTRA_SOUND: MEV_RELAYS_VALUES[8],
} as const

export const MEV_RELAY_QUERY_VALUES = Object.values(MEV_RELAYS_MAP)

export const MEV_RELAYS_LOGOS = {
  [MEV_RELAYS_MAP.AESTUS]: "Aestus",
  [MEV_RELAYS_MAP.AGNOSTIC]: "agnostic",
  [MEV_RELAYS_MAP.BLOXROUTE_MAX_PROFIT]: "blox-route",
  [MEV_RELAYS_MAP.BLOXROUTE_REGULATED]: "blox-route",
  [MEV_RELAYS_MAP.EDEN]: "eden",
  [MEV_RELAYS_MAP.TITAN]: "titan",
  [MEV_RELAYS_MAP.FLASHBOTS]: "Flashbots",
  [MEV_RELAYS_MAP.MANIFOLD]: "manifold",
  [MEV_RELAYS_MAP.ULTRA_SOUND]: "ultraSound",
}
export const sortOperators = <T extends { id: number }[]>(operators: T) => {
  return [...operators].sort((a, b) => a.id - b.id)
}
export const sumOperatorsFee = (operators: Pick<Operator, "fee">[]) => {
  return operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)
}

export const getOperatorIds = <T extends { id: number }[]>(operators: T) => {
  return sortNumbers(operators.map((operator) => operator.id))
}

export const createDefaultOperator = (
  operator: Partial<Operator> & { id: number }
): Operator =>
  ({
    id_str: operator.id.toString(),
    declared_fee: "0",
    previous_fee: "0",
    block: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    whitelist_addresses: [],
    fee: "0",
    public_key: "",
    owner_address: "",
    address_whitelist: "",
    is_private: false,
    whitelisting_contract: "",
    location: "",
    setup_provider: "",
    eth1_node_client: "",
    eth2_node_client: "",
    mev_relays: "",
    description: "",
    website_url: "",
    twitter_url: "",
    linkedin_url: "",
    dkg_address: "",
    logo: "",
    type: "operator",
    name: `Operator ${operator.id}`,
    performance: {
      "24h": 0,
      "30d": 0,
    },
    is_valid: true,
    is_deleted: false,
    is_active: 0,
    status: "No validators",
    validators_count: 0,
    version: "v4",
    network: "holesky",
    ...operator,
  }) satisfies Operator

export const sumOperatorsFees = (operators: Operator[]) =>
  operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)

export const addFallbackOperatorName = (operator: Operator) => {
  return {
    ...operator,
    name: operator.name || `Operator ${operator.id}`,
  }
}
