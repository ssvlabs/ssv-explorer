"use client"

import { usePathname, useRouter } from "next/navigation"

import { chainByName, type ChainName } from "@/config/chains"
import { networkRegex } from "@/lib/utils/link"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"

const whitelistedRoutesRegex = new RegExp(
  `(${[
    "/overview",
    "/operators",
    "/validators",
    "/operators",
    "/accounts",
  ].join("|")})`
)
export const useNetworkQuery = () => {
  const router = useRouter()
  const network = useNetworkParam()
  const pathname = usePathname()

  const setNetwork = (network: ChainName) => {
    if (whitelistedRoutesRegex.test(pathname))
      return router.push(pathname.replace(networkRegex, network))
    router.push(`/${network}/overview`)
  }

  return {
    query: { value: network, set: setNetwork },
    chain: chainByName[network],
  }
}
