"use client"

import { useEffect } from "react"
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

const networkRedirects: { [key in ChainName]?: string } = {
  hoodi: "https://explorer.hoodi.ssv.network/",
}

const maybeRedirect = (network: ChainName) => {
  const targetBaseUrl = networkRedirects[network]
  if (!targetBaseUrl) return false

  const targetUrl = new URL(window.location.pathname, targetBaseUrl)
  if (window.location.origin === targetUrl.origin) return true

  window.location.assign(targetUrl.toString())
  return true
}

export const useNetworkQuery = () => {
  const router = useRouter()
  const network = useNetworkParam()
  const pathname = usePathname()

  useEffect(() => {
    maybeRedirect(network)
  }, [network])

  const setNetwork = (network: ChainName) => {
    if (maybeRedirect(network)) return

    if (whitelistedRoutesRegex.test(pathname))
      return router.push(pathname.replace(networkRegex, network))
    router.push(`/${network}/overview`)
  }

  return {
    query: { value: network, set: setNetwork },
    chain: chainByName[network],
  }
}
