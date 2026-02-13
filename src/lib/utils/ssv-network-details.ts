import "abitype"

import { Address, isAddress } from "viem"
import { z } from "zod"

import { type ChainName } from "@/config/chains"

// const networksString =
//   process.env.SSV_NETWORKS || process.env.NEXT_PUBLIC_SSV_NETWORKS

const NETWORKS = [
  {
    networkId: 560048,
    apiVersion: "v4",
    apiNetwork: "hoodi",
    api: "https://api.hoodi.ssv.network/api",
    explorerUrl: "https://explorer.hoodi.ssv.network/",
    insufficientBalanceUrl: "https://faucet.ssv.network",
    googleTagSecret: "GTM-K3GR7M5",
    tokenAddress: "0x9F5d4Ec84fC4785788aB44F9de973cF34F7A038e",
    setterContractAddress:
      "0x58410Bef803ECd7E63B23664C586A6DB72DAf59c" as Address,
    getterContractAddress:
      "0x5AdDb3f1529C5ec70D77400499eE4bbF328368fe" as Address,
  },
]

const networkSchema = z
  .array(
    z.object({
      networkId: z.number(),
      api: z.string(),
      apiVersion: z.string(),
      apiNetwork: z.string(),
      explorerUrl: z.string(),
      insufficientBalanceUrl: z.string(),
      googleTagSecret: z.string().optional(),
      tokenAddress: z.string().refine(isAddress).optional(),
      setterContractAddress: z.string().refine(isAddress).optional(),
      getterContractAddress: z.string().refine(isAddress).optional(),
    })
  )
  .min(1)

const additionalEnvSchema = z.object({
  COINCECKO_API_URL: z.string().url().optional(),
  COINCECKO_API_KEY: z.string().optional(),
})

if (!NETWORKS) {
  throw new Error("SSV_NETWORKS is not defined in the environment variables")
}
const parsedAdditionalEnv = additionalEnvSchema.safeParse(process.env)

const parsed = networkSchema.safeParse(NETWORKS)

if (!parsed.success) {
  throw new Error(
    `
Invalid network schema in SSV_NETWORKS environment variable:
\t${parsed.error?.errors
      .map((error) => `${error.path.join(".")} -> ${error.message}`)
      .join("\n\t")}
    `
  )
}

export const networks = parsed.data

if (!parsedAdditionalEnv.success) {
  throw new Error(
    `
Invalid Additional Env schema:
\t${parsedAdditionalEnv.error?.errors
      .map((error) => `${error.path.join(".")} -> ${error.message}`)
      .join("\n\t")}
    `
  )
}

export const getSSVNetworkDetails = (chainName?: ChainName) => {
  return parsed.data.find(
    (network) => network.apiNetwork === chainName?.toLowerCase()
  )
}

export const getAdditionalEnvDetails = () => {
  return { ...parsedAdditionalEnv.data, networks }
}
