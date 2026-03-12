import { createPublicClient, defineChain, http, type Address } from "viem"
import { mainnet } from "viem/chains"

import { type Cluster } from "@/types/api"
import { chainByName, type ChainName } from "@/config/chains"
import { ssvNetworkViewsAbi } from "@/lib/abi/getter"
import { getSSVNetworkDetails } from "@/lib/utils/ssv-network-details"

/**
 * Server-side function to fetch cluster balance directly from contract
 * Calls both getBalance (ETH) and getBalanceSSV (SSV) and returns whichever has a value
 * This eliminates dependency on API snapshot data
 */
export async function getClusterBalance(params: {
  cluster: Cluster
  network: ChainName
}): Promise<{ balance: bigint; isMigrated: boolean }> {
  const { cluster, network } = params

  const networkDetails = getSSVNetworkDetails(network)
  if (!networkDetails?.getterContractAddress) {
    throw new Error("Getter contract address not found")
  }

  const chainConfig = chainByName[network]
  if (!chainConfig) {
    throw new Error(`Chain configuration not found for network: ${network}`)
  }

  // Define chain and RPC based on network
  let chain
  let rpcUrl: string | undefined

  if (network === "mainnet") {
    chain = mainnet
    rpcUrl =
      "https://ethereum-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27"
  } else if (network === "hoodi") {
    chain = defineChain({
      id: chainConfig.chainId,
      name: chainConfig.displayName,
      nativeCurrency: chainConfig.nativeCurrency,
      rpcUrls: {
        default: {
          http: [
            "https://ethereum-hoodi-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27",
          ],
        },
      },
    })
    rpcUrl =
      "https://ethereum-hoodi-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27"
  } else {
    throw new Error(`Unsupported network: ${network}`)
  }

  const publicClient = createPublicClient({
    chain,
    transport: http(rpcUrl),
  })

  const operatorIds = cluster.operators.map((op) =>
    BigInt(typeof op === "number" ? op : op.id)
  )

  // Snapshot balances from API - needed by contract to calculate current balance
  // Contract uses these as baseline and subtracts accumulated fees
  const snapshotBalanceETH = BigInt(cluster.ethBalance || "0")
  const snapshotBalanceSSV = BigInt(cluster.balance || "0")

  const clusterDataETH = {
    validatorCount: Number(cluster.validatorCount),
    networkFeeIndex: BigInt(cluster.networkFeeIndex),
    index: BigInt(cluster.index),
    active: cluster.active,
    balance: snapshotBalanceETH,
  }

  const clusterDataSSV = {
    validatorCount: Number(cluster.validatorCount),
    networkFeeIndex: BigInt(cluster.networkFeeIndex),
    index: BigInt(cluster.index),
    active: cluster.active,
    balance: snapshotBalanceSSV,
  }

  // Call both getBalance (ETH) and getBalanceSSV (SSV)
  // Whichever returns a non-zero value is the correct asset type
  let ethBalance = 0n
  let ssvBalance = 0n

  try {
    ethBalance = await publicClient.readContract({
      address: networkDetails.getterContractAddress as Address,
      abi: ssvNetworkViewsAbi,
      functionName: "getBalance",
      args: [
        cluster.ownerAddress as Address,
        operatorIds as unknown as readonly bigint[],
        clusterDataETH,
      ],
    })
  } catch (error) {
    // getBalance failed, cluster might be SSV-based
  }

  try {
    ssvBalance = await publicClient.readContract({
      address: networkDetails.getterContractAddress as Address,
      abi: ssvNetworkViewsAbi,
      functionName: "getBalanceSSV",
      args: [
        cluster.ownerAddress as Address,
        operatorIds as unknown as readonly bigint[],
        clusterDataSSV,
      ],
    })
  } catch (error) {
    // getBalanceSSV failed, cluster might be ETH-based
  }

  // Return whichever has a non-zero balance
  if (ethBalance > 0n) {
    return { balance: ethBalance, isMigrated: true }
  }

  return { balance: ssvBalance, isMigrated: false }
}
