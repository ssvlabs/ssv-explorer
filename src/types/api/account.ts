import type { WithPagination } from "./paginations"

export type Account = {
  id: number
  ownerAddress: string
  recipientAddress?: string
  network: string
  version: string
  nonce: number
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
  }
}

export interface GetAccountResponse {
  type: string
  account: Account | null
}
