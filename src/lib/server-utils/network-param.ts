import { chainByName, supportedChains, type ChainName } from "@/config/chains"

export const extractNetworkParam = (params: { network?: ChainName } = {}) => {
  const defaultChain = supportedChains[0]!
  const chain = chainByName[params.network ?? defaultChain.name] ?? defaultChain
  return chain.name
}
