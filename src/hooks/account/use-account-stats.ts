import { getAccountStats } from "@/api/account"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { isAddress, type Address } from "viem"

import { useNetworkQuery } from "../search/use-network-query"
import { searchValidators } from "@/api/validators"

export const useAccountStats = (address: Address) => {
  const network = useNetworkQuery()
  return useQuery({
    queryKey: ["account-stats", address, network.query.value],
    queryFn: async () => {
      const [stats, validators] = await Promise.all([
        getAccountStats({ address, network: network.query.value }),
        searchValidators({
          network: network.query.value,
          ownerAddress: [address],
        }),
      ])
      return {
        ...stats.data,
        validators: validators.pagination.total,
      }
    },
    enabled: isAddress(address, { strict: false }),
  })
}
