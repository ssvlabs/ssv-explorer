import { getDutyDetails } from "@/api/duties"
import { useQuery } from "@tanstack/react-query"

import { type ChainName } from "@/config/chains"

export const useDutyDetails = (params: {
  publicKey: string
  slot: number
  role: string
  network: ChainName
  enabled?: boolean
}) => {
  return useQuery({
    queryKey: [
      "duty-details",
      params.publicKey,
      params.slot,
      params.role,
      params.network,
    ],
    queryFn: () => getDutyDetails(params),
    enabled: params.enabled ?? true,
  })
}
