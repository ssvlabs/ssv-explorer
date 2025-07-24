import { getNativeCurrency } from "@/lib/utils/viem"

import { useNetworkQuery } from "../search/use-network-query"

export const useNativeCurrency = () => {
  const network = useNetworkQuery()
  return getNativeCurrency(network.query.value)
}
