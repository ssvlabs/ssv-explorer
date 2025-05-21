const mainnet = {
  name: "mainnet",
  testnet: false,
  chainId: 1,
} as const

const hoodi = {
  name: "hoodi",
  testnet: true,
  chainId: 560048,
} as const

export const chains = {
  mainnet,
  holesky: hoodi,
  [mainnet.chainId]: mainnet,
  [hoodi.chainId]: hoodi,
} as const

export type ChainTuple = [typeof mainnet.chainId, typeof hoodi.chainId]
export type SupportedChain = ChainTuple[number]
