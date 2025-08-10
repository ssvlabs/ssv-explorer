import { networks } from "@/lib/utils/ssv-network-details"

export const defaultNativeCurrency = {
  name: "Ethereum",
  symbol: "ETH",
  decimals: 18,
}

const mainnet = {
  name: "mainnet",
  testnet: false,
  chainId: 1,
  genesisTimestamp: 1438269973000,
  nativeCurrency: defaultNativeCurrency,
} as const

const hoodi = {
  name: "hoodi",
  testnet: true,
  chainId: 560048,
  genesisTimestamp: 1742213400000,
  nativeCurrency: defaultNativeCurrency,
} as const

const chains = [mainnet, hoodi]

export const supportedChains = networks.reduce(
  (acc, network) => {
    const chain = chains.find((chain) => chain.chainId === network.networkId)
    if (!chain) return acc
    return [...acc, chain]
  },
  [] as typeof chains
)

export const chainIds = supportedChains.map((chain) => chain.chainId)
export const chainNames = supportedChains.map((chain) => chain.name)

export type ChainID = (typeof supportedChains)[number]["chainId"]
export type ChainName = (typeof supportedChains)[number]["name"]

export const chainsById = supportedChains.reduce(
  (acc, chain) => {
    acc[chain.chainId] = chain
    return acc
  },
  {} as Record<ChainID, (typeof chains)[number]>
)

export const chainByName = supportedChains.reduce(
  (acc, chain) => {
    acc[chain.name] = chain
    return acc
  },
  {} as Record<ChainName, (typeof chains)[number]>
)

export const getNativeCurrency = (network: ChainName) => {
  return chainByName[network]?.nativeCurrency ?? defaultNativeCurrency
}
