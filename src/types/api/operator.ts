import { type WithInfinitePagination } from "./paginations"

interface Performance {
  "24h": number
  "30d": number
}

export interface Operator {
  id: number
  id_str: string
  address_whitelist: string
  block: number
  created_at: string
  declared_fee: string
  description: string
  dkg_address: string
  eth1_node_client: string
  eth2_node_client: string
  fee: string
  is_active: number
  is_deleted: boolean
  is_private: boolean
  is_valid: boolean
  linkedin_url: string
  location: string
  logo: string
  mev_relays: string
  name: string
  network: string
  owner_address: string
  performance: Performance
  previous_fee: string
  public_key: string
  setup_provider: string
  twitter_url: string
  updated_at: string
  validators_count: number
  version: string
  website_url: string
  whitelist_addresses: string[]
  whitelisting_contract: string
  type: "verified_operator" | "dapp_node" | "operator"

  status: "No validators" | "Active" | "Inactive" | "Removed"
}

export type OperatorSortingKeys = Pick<
  Operator,
  "validators_count" | "fee" | "status" | "id"
> & {
  performance24h: number
  performance30d: number
}

export type OperatorsSearchResponse = WithInfinitePagination<{
  operators: Operator[]
}>
