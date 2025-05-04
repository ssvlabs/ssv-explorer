import { type WithInfinitePagination } from "./paginations"

export interface Operator {
  id: number
  idStr: string
  declaredFee: string
  previousFee: string
  fee: string
  publicKey: string
  ownerAddress: string
  addressWhitelist: string
  isPrivate: boolean
  whitelistingContract: string
  location: string
  setupProvider: string
  eth1NodeClient: string
  eth2NodeClient: string
  mevRelays: string
  description: string
  websiteUrl: string
  twitterUrl: string
  linkedinUrl: string
  dkgAddress: string
  logo: string
  type: "verified_operator" | "dapp_node" | "operator"
  name: string
  performance: Performance
  isValid: boolean
  isDeleted: boolean
  isActive: number
  status: "No validators" | "Active" | "Inactive" | "Removed"
  validatorsCount: number
  version: string
  network: string
}

export type OperatorSortingKeys = Pick<
  Operator,
  "validatorsCount" | "fee" | "status" | "id"
> & {
  performance24h: number
  performance30d: number
}

export interface Performance {
  "24h": number
  "30d": number
}

export type OperatorsSearchResponse = WithInfinitePagination<{
  data: Operator[]
}>
