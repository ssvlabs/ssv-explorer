"use client"

import { getOperatorNodeClients } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"

export const useOperatorNodeClients = () => {
  const network = useNetworkParam()

  return useQuery({
    queryKey: ["operator-node-clients", network],
    queryFn: () => getOperatorNodeClients(network),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
