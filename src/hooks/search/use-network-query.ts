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

const hosts: { [key in ChainName]?: URL } = {
  mainnet: new URL("https://explorer.ssv.network/"), // production explorer
  hoodi: new URL("https://explorer.hoodi.ssv.network/"), // production explorer
}

const origins = Object.values(hosts).map((host) => host.origin)

const maybeRedirect = (targetNetwork: ChainName) => {
  // Only redirect when on a production explorer (mainnet or hoodi).
  // This enables cross-network switching (mainnet ↔ hoodi).
  // Non-production origins (e.g. explorer.stage.ssv.network, localhost) skip this redirect.
  if (!origins.includes(window.location.origin)) return false

  const targetHost = hosts[targetNetwork]
  if (!targetHost) return false

  const targetUrl = new URL(window.location.pathname, targetHost.origin)
  if (window.location.origin === targetUrl.origin) return false

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
