import type { WithPagination } from "./paginations"

export type Account = {
  id: number
  ownerAddress: string
  recipientAddress?: string
  network: string
  version: string
}

export type PaginatedAccountsResponse = WithPagination<{
  type: string
  accounts: Account[]
}>

export type FilteredAccountsResponse = {
  type: string
  data: Account[]
  filter: {
    page: number
    perPage: number
  }
}

export interface GetAccountResponse {
  type: string
  account: Account | null
}
