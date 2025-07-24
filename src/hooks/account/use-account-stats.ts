import { getAccountStats } from "@/api/account"
import { useQuery } from "@tanstack/react-query"
import { isAddress, type Address } from "viem"

import { useNetworkQuery } from "../search/use-network-query"

export const useAccountStats = (address: Address) => {
  const network = useNetworkQuery()
  return useQuery({
    queryKey: ["account-stats", address, network.query.value],
    queryFn: async () => {
      const stats = await getAccountStats({
        address,
        network: network.query.value,
      })
      return stats.data
    },
    enabled: isAddress(address, { strict: false }),
  })
}
