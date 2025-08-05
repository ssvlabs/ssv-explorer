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

export const chainIds = Object.values(chains).map((chain) => chain.chainId)
export const chainNames = Object.values(chains).map((chain) => chain.name)

export type ChainTuple = [typeof mainnet.chainId, typeof hoodi.chainId]
export type ChainID = ChainTuple[number]
export type ChainName = typeof mainnet.name | typeof hoodi.name
