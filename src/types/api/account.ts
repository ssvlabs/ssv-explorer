import type { WithPagination } from "./paginations"

export type Account = {
  id: string
  network: string
  version: string
  ownerAddress: string
  recipientAddress?: string
  nonce: number
  validators: number
  operators: number
  clusters: number
  totalOperatorEthManaged: string
  effectiveBalance: string
}

export type PaginatedAccountsResponse = WithPagination<{
  type: string
  accounts: Account[]
}>

export type AccountStatsResponse = {
  type: string
  data: {
    operators: number
    clusters: number
    validators: number
    effectiveBalance: string
    totalOperatorEthManaged: string
  }
}

export interface GetAccountResponse {
  type: string
  account: Account | null
}
