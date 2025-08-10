import { useParams } from "next/navigation"

import { chainByName, supportedChains, type ChainName } from "@/config/chains"

export const useNetworkParam = () => {
  const params = useParams<{ network: ChainName }>()
  const chain = chainByName[params.network] ?? supportedChains[0]
  return chain.name
}
