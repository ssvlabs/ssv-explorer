import { hoodi as hoodiViem, mainnet as mainnetViem } from "viem/chains"

import { networks } from "@/lib/utils/ssv-network-details"

export const defaultNativeCurrency = {
  name: "Ethereum",
  symbol: "ETH",
  decimals: 18,
}

const mainnet = {
  ...mainnetViem,
  name: "mainnet",
  displayName: "Ethereum",
  testnet: false,
  genesisTimestamp: 1438269973000,
} as const

const hoodi = {
  ...hoodiViem,
  name: "hoodi",
  displayName: "Hoodi",
  testnet: true,
  genesisTimestamp: 1742213400000,
} as const

export type CustomChain = typeof mainnet | typeof hoodi

const chains = [mainnet, hoodi]

export const supportedChains = networks.reduce(
  (acc, network) => {
    const chain = chains.find((chain) => chain.id === network.networkId)
    if (!chain) return acc
    return [...acc, chain]
  },
  [] as typeof chains
)

export const chainIds = supportedChains.map((chain) => chain.id)
export const chainNames = supportedChains.map((chain) => chain.name)

export type ChainID = (typeof supportedChains)[number]["id"]
export type ChainName = (typeof supportedChains)[number]["name"]

export const chainsById = supportedChains.reduce(
  (acc, chain) => {
    acc[chain.id] = chain
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
