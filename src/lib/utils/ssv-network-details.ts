import { isAddress } from "viem"
import { z } from "zod"

const networksString =
  process.env.SSV_NETWORKS || process.env.NEXT_PUBLIC_SSV_NETWORKS

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

if (!networksString) {
  throw new Error("SSV_NETWORKS is not defined in the environment variables")
}

const parsed = networkSchema.safeParse(JSON.parse(networksString))
export const networks = parsed.data!

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

export const getSSVNetworkDetails = (chainId?: number) => {
  return parsed.data.find((network) => network.networkId === chainId)
}
