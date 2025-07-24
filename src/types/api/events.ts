import { type WithPagination } from "@/types/api"
import { type AccountEventName } from "@/lib/utils/account-events"

export type PaginatedEventsResponse = WithPagination<{
  data: AccountEvent[]
}>

export interface AccountEvent {
  network: string
  version: string
  logIndex: string
  transactionHash: string
  transactionIndex: string
  event: AccountEventName
  blockNumber: string
  ownerAddress: string
  createdAt: string
}
