import { chainByName, supportedChains, type ChainName } from "@/config/chains"

type NetworkParamContext = {
  host?: string
}

export const resolveDomainChainName = (hostname?: string): ChainName => {
  if (hostname) {
    const normalized = hostname.toLowerCase()
    const chainNames = Object.keys(chainByName) as ChainName[]
    const urlNetwork = chainNames.find((chainName) =>
      normalized.includes(chainName.toLowerCase())
    )
    if (urlNetwork) return urlNetwork
  }

  return supportedChains[0]!.name
}

export const extractNetworkParam = (
  params: { network?: ChainName } = {},
  context?: NetworkParamContext
) => {
  const defaultChainName = resolveDomainChainName(context?.host)
  const defaultChain = chainByName[defaultChainName] ?? supportedChains[0]!
  const chain = chainByName[params.network ?? defaultChain.name] ?? defaultChain
  return chain.name
}
