import urlJoin from "url-join"

import { type ChainName } from "@/config/chains"
import { getSSVNetworkDetails } from "@/lib/utils/ssv-network-details"

export const endpoint = (
  chainName: ChainName,
  ...paths: (string | number)[]
) => {
  const ssvNetwork = getSSVNetworkDetails(chainName)
  if (!ssvNetwork) {
    throw new Error(`SSV network details not found for chainId: ${chainName}`)
  }
  const url = urlJoin(
    ssvNetwork.api,
    ssvNetwork.apiVersion,
    ssvNetwork.apiNetwork,
    ...paths.map(String)
  )

  // For debugging purposes
  if (process.env.NODE_ENV === "development") console.log("endpoint:", url)
  return url
}
