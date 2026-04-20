"use client"

import { getOperatorPerformanceChart } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"

import { type OperatorPerformanceChart } from "@/types/api/operator"
import { type ChainName } from "@/config/chains"

export const useOperatorPerformanceChart = (params: {
  operatorId: number
  network: ChainName
  points: number
  type: OperatorPerformanceChart["type"]
}) => {
  return useQuery({
    queryKey: [
      "operator-performance-chart",
      params.network,
      params.operatorId,
      params.points,
      params.type,
    ],
    queryFn: async () =>
      await getOperatorPerformanceChart({
        network: params.network,
        operatorId: params.operatorId,
        points: params.points,
        type: params.type,
      }),
    enabled: Boolean(params.operatorId && params.network),
    staleTime: 60 * 1000,
  })
}
