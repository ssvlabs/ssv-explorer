import type { Operator } from "./operator"
import { type WithInfinitePagination } from "./paginations"

export interface SearchValidator<T extends Operator | string = string> {
  id: string
  ownerAddress: string
  network: string
  version: string
  cluster: string
  publicKey: string
  isValid: boolean
  isLiquidated: boolean
  isDeleted: boolean
  isOperatorsValid: boolean
  isPublicKeyValid: boolean
  isSharesValid: boolean
  operators: T[]
  createdAt: string
  updatedAt: string
  status: Validator["status"]
  validatorInfo: {
    index: number
    status: string
    activation_epoch: number
  }
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
  data: SearchValidator<T>[]
}>
