import { useParams } from "next/navigation"

import { type ChainName } from "@/config/chains"

export const useNetworkParam = () => {
  return useParams<{ network: ChainName }>().network ?? "mainnet"
}
