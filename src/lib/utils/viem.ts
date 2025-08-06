import { mainnet } from "viem/chains"

import { type ChainName } from "@/config/chains"

export const defaultNativeCurrency = {
  name: "Ethereum",
  symbol: "ETH",
  decimals: 18,
}

export const hoodi = {
  id: 560048,
  name: "Hoodi",
  network: "hoodi",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://ethereum-hoodi-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27",
      ],
    },
    public: {
      http: [
        "https://ethereum-hoodi-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://hoodi.cloud.blockscout.com",
    },
  },
  iconBackground: "none",
  iconUrl: "/images/networks/light.svg",
  testnet: true,
}
export const chains = {
  [mainnet.id]: mainnet,
  [hoodi.id]: hoodi,
} as const

export const chainByName = {
  mainnet: mainnet,
  hoodi: hoodi,
} as const

export type ChainId = keyof typeof chains

export const getNativeCurrency = (network: ChainName) => {
  return chainByName[network]?.nativeCurrency ?? defaultNativeCurrency
}

export const getNativeCurrencySymbol = (network: ChainId) => {
  return chains[network]?.nativeCurrency?.symbol ?? defaultNativeCurrency.symbol
}
