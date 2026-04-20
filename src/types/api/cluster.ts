import type { Operator } from "./operator"
import type { WithPagination } from "./paginations"

export type SolidityCluster = {
  active: boolean
  balance: bigint
  index: bigint
  networkFeeIndex: bigint
  validatorCount: number
}

export type Cluster<T extends (Operator | number)[] = Operator[]> = {
  id: string
  network: string
  version: string
  validatorCount: string
  networkFeeIndex: string
  ownerAddress: string
  index: string
  isLiquidated: boolean
  effectiveBalance: string
  clusterId: string
  blockNumber: string
  balance: string
  ethBalance: string
  active: boolean
  migrated: boolean
  updatedAt: Date
  createdAt: Date
  operators: T
}

export type PaginatedClustersResponse<
  T extends (Operator | number)[] = number[],
> = WithPagination<{
  clusters: Cluster<T>[]
}>

export type GetClusterResponse<T extends (Operator | number)[] = number[]> = {
  type: string
  cluster: Cluster<T>
}
