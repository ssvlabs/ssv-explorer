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
  status: Validator["status"]
  updated_at: string
  validator_info: {
    activation_epoch: number
    effective_balance: number
    index: number
    status: string
  }
  version: string
}

export interface Validator {
  public_key: string
  cluster: string
  owner_address: string
  status: "Active" | "Inactive"
  is_valid: boolean
  is_deleted: boolean
  is_public_key_valid: boolean
  is_shares_valid: boolean
  is_operators_valid: boolean
  operators: Operator[]
  version: string
  network: string
  updated_at?: string
  validator_info: {
    index: number
    status: string
    activation_epoch: number
  }
}

export type PaginatedValidatorsResponse<
  T extends Operator | string = Operator,
> = WithInfinitePagination<{
  validators: SearchValidator<T>[]
}>
