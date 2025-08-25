export interface OperatorStatistics {
  consensus_client: OperatorStatisticItem[]
  execution_client: OperatorStatisticItem[]
  geolocation: OperatorStatisticItem[]
  total_count: number
}

export interface OperatorStatisticItem {
  name: string
  count: number
  percentage: number
}
