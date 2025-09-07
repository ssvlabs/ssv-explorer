import {
  type BeaconChainStatus,
  type ValidatorStatus,
} from "@/lib/utils/validator-status-mapping"

import type { Operator } from "./operator"
import { type WithInfinitePagination } from "./paginations"

export interface SearchValidator<T extends Operator | string = string> {
  block: number
  cluster: string
  created_at: string
  id: number
  is_deleted: boolean
  is_liquidated: boolean
  is_operators_valid: boolean
  is_public_key_valid: boolean
  is_shares_valid: boolean
  is_valid: boolean
  network: string
  operators: T[]
  owner_address: string
  public_key: string
  status: ValidatorStatus
  updated_at: string
  validator_info: ValidatorInfo
  version: string
}

export interface Validator {
  public_key: string
  cluster: string
  owner_address: string
  status: ValidatorStatus
  is_valid: boolean
  is_deleted: boolean
  is_public_key_valid: boolean
  is_shares_valid: boolean
  is_operators_valid: boolean
  operators: Operator[]
  version: string
  network: string
  updated_at?: string
  validator_info: ValidatorInfo
}

interface ValidatorInfo {
  index: number
  effective_balance: number
  status: BeaconChainStatus
  activation_epoch: number
}
export type PaginatedValidatorsResponse<
  T extends Operator | string = Operator,
> = WithInfinitePagination<{
  validators: SearchValidator<T>[]
}>
