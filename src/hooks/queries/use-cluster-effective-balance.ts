"use client"

import { getClusterEffectiveBalance } from "@/api/clusters"
import { useQuery } from "@tanstack/react-query"
import { type Hex } from "viem"

import { type ChainName } from "@/config/chains"

export const useClusterEffectiveBalance = (params: {
  clusterId: Hex
  network: ChainName
}) => {
  return useQuery({
    queryKey: ["cluster-effective-balance", params.clusterId, params.network],
    queryFn: async () => {
      const response = await getClusterEffectiveBalance({
        id: params.clusterId,
        network: params.network,
      })
      return BigInt(response.effectiveBalance)
    },
  })
}
