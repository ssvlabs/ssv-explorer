import { getAccountStats } from "@/api/account"
import { useQuery } from "@tanstack/react-query"
import { isAddress, type Address } from "viem"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"

export const useAccountStats = (address: Address) => {
  const { network } = useNetworkParam()
  return useQuery({
    queryKey: ["account-stats", address, network],
    queryFn: async () => {
      const stats = await getAccountStats({
        address,
        network,
      })
      return stats.data
    },
    enabled: isAddress(address, { strict: false }),
  })
}
