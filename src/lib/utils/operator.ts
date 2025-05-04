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

export const getMevRelaysOptions = (mevRelays: string[]) => {
  return mevRelays.includes(MEV_RELAYS_MAP.EDEN)
    ? Object.values(MEV_RELAYS_MAP).map((value) => ({
        value: value,
        label: value,
      }))
    : Object.values(MEV_RELAYS_MAP)
        .filter((mevRelay: string) => mevRelay !== MEV_RELAYS_MAP.EDEN)
        .map((value) => ({ value: value, label: value }))
}

export type OperatorMetadataKeys = Extract<
  keyof Operator,
  | "name"
  | "logo"
  | "description"
  | "setupProvider"
  | "mevRelays"
  | "location"
  | "eth1NodeClient"
  | "eth2NodeClient"
  | "websiteUrl"
  | "twitterUrl"
  | "linkedinUrl"
  | "dkgAddress"
>

export enum OperatorMetadataFields {
  OperatorName = "name",
  OperatorImage = "logo",
  Description = "description",
  SetupProvider = "setupProvider",
  MevRelays = "mevRelays",
  Location = "location",
  ExecutionClient = "eth1NodeClient",
  ConsensusClient = "eth2NodeClient",
  WebsiteUrl = "websiteUrl",
  TwitterUrl = "twitterUrl",
  LinkedinUrl = "linkedinUrl",
  DkgAddress = "dkgAddress",
}

export const SORTED_OPERATOR_METADATA_FIELDS: OperatorMetadataKeys[] = [
  OperatorMetadataFields.OperatorName,
  OperatorMetadataFields.Description,
  OperatorMetadataFields.Location,
  OperatorMetadataFields.SetupProvider,
  OperatorMetadataFields.ExecutionClient,
  OperatorMetadataFields.ConsensusClient,
  OperatorMetadataFields.MevRelays,
  OperatorMetadataFields.WebsiteUrl,
  OperatorMetadataFields.TwitterUrl,
  OperatorMetadataFields.LinkedinUrl,
  OperatorMetadataFields.DkgAddress,
  OperatorMetadataFields.OperatorImage,
] as const

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
): Operator => ({
  idStr: operator.id.toString(),
  declaredFee: "0",
  previousFee: "0",
  fee: "0",
  publicKey: "",
  ownerAddress: "",
  addressWhitelist: "",
  isPrivate: false,
  whitelistingContract: "",
  location: "",
  setupProvider: "",
  eth1NodeClient: "",
  eth2NodeClient: "",
  mevRelays: "",
  description: "",
  websiteUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  dkgAddress: "",
  logo: "",
  type: "operator",
  name: `Operator ${operator.id}`,
  performance: {
    "24h": 0,
    "30d": 0,
  },
  isValid: true,
  isDeleted: false,
  isActive: 0,
  status: "No validators",
  validatorsCount: 0,
  version: "v4",
  network: "holesky",
  ...operator,
})

export const sumOperatorsFees = (operators: Operator[]) =>
  operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)
