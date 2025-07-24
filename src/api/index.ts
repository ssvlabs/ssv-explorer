import urlJoin from "url-join"

import { getSSVNetworkDetails } from "@/lib/utils/ssv-network-details"

export const endpoint = (chainId: number, ...paths: (string | number)[]) => {
  const ssvNetwork = getSSVNetworkDetails(chainId)
  if (!ssvNetwork) {
    throw new Error(`SSV network details not found for chainId: ${chainId}`)
  }
  return urlJoin(
    ssvNetwork.api,
    ssvNetwork.apiVersion,
    ssvNetwork.apiNetwork,
    ...paths.map(String)
  )
}
