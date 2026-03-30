import "abitype"

import { isAddress } from "viem"
import { z } from "zod"

import { type ChainName } from "@/config/chains"

const networksString =
  process.env.SSV_NETWORKS || process.env.NEXT_PUBLIC_SSV_NETWORKS

if (!networksString) {
  throw new Error(
    "SSV_NETWORKS or NEXT_PUBLIC_SSV_NETWORKS is not defined in the environment variables"
  )
}

const NETWORKS = JSON.parse(networksString)

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
      cTokenAddress: z.string().refine(isAddress).optional(),
      setterContractAddress: z.string().refine(isAddress).optional(),
      getterContractAddress: z.string().refine(isAddress).optional(),
    })
  )
  .min(1)

const additionalEnvSchema = z.object({
  COINGECKO_API_KEY: z.string().optional(),
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
