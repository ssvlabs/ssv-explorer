"use client"

import { api } from "@/api/api-client"
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
      await api.get<OperatorPerformanceChart>(
        `/api/${params.network}/operator/${params.operatorId}/performance-chart${queryString(params)}`
      ),
    enabled: Boolean(params.operatorId && params.network),
    staleTime: 60 * 1000,
  })
}

const queryString = (params: { points?: number; type?: string }) => {
  const searchParams = new URLSearchParams()
  if (params.points !== undefined) {
    searchParams.set("points", params.points.toString())
  }
  if (params.type) {
    searchParams.set("type", params.type)
  }
  return searchParams.size ? `?${searchParams.toString()}` : ""
}
