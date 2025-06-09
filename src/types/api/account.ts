import type { WithPagination } from "./paginations"

export type Account = {
  id: number
  ownerAddress: string
  recipientAddress?: string
  network: string
  version: string
  nonce: number
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
  }
}

export interface GetAccountResponse {
  type: string
  account: Account | null
}
