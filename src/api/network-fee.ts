"use server"

import { createPublicClient, getContract, http } from "viem"

import { chainByName, type ChainName } from "@/config/chains"
import { GetterABI } from "@/lib/abi/getter"
import { getSSVNetworkDetails } from "@/lib/utils/ssv-network-details"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export type NetworkFeeParams = {
  ethNetworkFee: string
  ssvNetworkFee: string
  liquidationThresholdBlocks: string
  liquidationThresholdBlocksSSV: string
  minimumLiquidationCollateral: string
  minimumLiquidationCollateralSSV: string
}

const fetchNetworkFeeParams = async (params: {
  network: ChainName
}): Promise<NetworkFeeParams> => {
  const ssvNetworkConfig = getSSVNetworkDetails(params.network)
  if (!ssvNetworkConfig) {
    throw new Error(
      `SSV network details not found for chainId: ${params.network}`
    )
  }

  const client = createPublicClient({
    chain: chainByName[params.network],
    transport: http(),
  })

  const contract = getContract({
    address: ssvNetworkConfig.getterContractAddress,
    abi: GetterABI,
    client,
  })

  const [
    ethNetworkFee,
    ssvNetworkFee,
    liquidationThresholdBlocks,
    liquidationThresholdBlocksSSV,
    minimumLiquidationCollateral,
    minimumLiquidationCollateralSSV,
  ] = await Promise.all([
    contract.read.getNetworkFee().catch(() => 0n),
    contract.read.getNetworkFeeSSV().catch(() => 0n),
    contract.read.getLiquidationThresholdPeriod().catch(() => 0n),
    contract.read.getLiquidationThresholdPeriodSSV().catch(() => 0n),
    contract.read.getMinimumLiquidationCollateral().catch(() => 0n),
    contract.read.getMinimumLiquidationCollateralSSV().catch(() => 0n),
  ])

  return {
    ethNetworkFee: ethNetworkFee.toString(),
    ssvNetworkFee: ssvNetworkFee.toString(),
    liquidationThresholdBlocks: liquidationThresholdBlocks.toString(),
    liquidationThresholdBlocksSSV: liquidationThresholdBlocksSSV.toString(),
    minimumLiquidationCollateral: minimumLiquidationCollateral.toString(),
    minimumLiquidationCollateralSSV: minimumLiquidationCollateralSSV.toString(),
  }
}

export const getNetworkFeeParams = async (params: { network: ChainName }) =>
  await unstable_cache(
    async () => fetchNetworkFeeParams(params),
    [JSON.stringify(params)],
    {
      revalidate: 30,
      tags: [`network-fees-params-${params.network}`],
    }
  )()
