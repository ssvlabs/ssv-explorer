const mainnet = {
  name: "mainnet",
  testnet: false,
  chainId: 1,
  genesisTimestamp: 1438269973000,
} as const

const hoodi = {
  name: "hoodi",
  testnet: true,
  chainId: 560048,
  genesisTimestamp: 1742213400000,
} as const

export const chains = {
  [mainnet.chainId]: mainnet,
  [hoodi.chainId]: hoodi,
} as const

export type ChainTuple = [typeof mainnet.chainId, typeof hoodi.chainId]
export type SupportedChain = ChainTuple[number]
