const mainnet = {
  name: "mainnet",
  testnet: false,
  chainId: 1,
} as const

const holesky = {
  name: "holesky",
  testnet: true,
  chainId: 17000,
} as const

export const chains = {
  mainnet,
  holesky,
  [mainnet.chainId]: mainnet,
  [holesky.chainId]: holesky,
} as const

export type ChainTuple = [typeof mainnet.chainId, typeof holesky.chainId]
export type SupportedChain = ChainTuple[number]
