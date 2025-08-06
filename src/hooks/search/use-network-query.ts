"use client"

import { useRouter } from "next/navigation"

import { type ChainName } from "@/config/chains"
import { networkRegex } from "@/lib/utils/link"
import { chainByName } from "@/lib/utils/viem"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"

export const useNetworkQuery = () => {
  const router = useRouter()
  const { network } = useNetworkParam()
  console.log("network:", network)
  const setNetwork = (network: ChainName) => {
    router.push(location.pathname.replace(networkRegex, network))
  }

  return {
    query: { value: network, set: setNetwork },
    chain: chainByName[network],
  }
}
