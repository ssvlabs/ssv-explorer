"use client"

import { useEffect, useState } from "react"
import { createPublicClient, defineChain, http, type Address } from "viem"
import { mainnet } from "viem/chains"

import { type Cluster } from "@/types/api"
import { chainByName, type ChainName } from "@/config/chains"
import { ssvNetworkViewsAbi } from "@/lib/contracts/ssv-network-views-abi"
import { getSSVNetworkDetails } from "@/lib/utils/ssv-network-details"

export const useClusterContractBalance = (params: {
  cluster: Cluster
  network: ChainName
}) => {
  const { cluster, network } = params
  const [balance, setBalance] = useState<bigint | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const networkDetails = getSSVNetworkDetails(network)
        if (!networkDetails?.getterContractAddress) {
          throw new Error("Getter contract address not found")
        }

        const chainConfig = chainByName[network]
        if (!chainConfig) {
          throw new Error(
            `Chain configuration not found for network: ${network}`
          )
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

        // For migrated clusters, use ethBalance; for non-migrated, use balance (SSV)
        // This is the snapshot balance that the contract uses to calculate the current balance
        const snapshotBalance = cluster.migrated
          ? BigInt(cluster.ethBalance || "0")
          : BigInt(cluster.balance || "0")

        const clusterData = {
          validatorCount: Number(cluster.validatorCount),
          networkFeeIndex: BigInt(cluster.networkFeeIndex),
          index: BigInt(cluster.index),
          active: cluster.active,
          balance: snapshotBalance,
        }

        // Use getBalance for ETH clusters (migrated), getBalanceSSV for SSV clusters
        const functionName = cluster.migrated ? "getBalance" : "getBalanceSSV"

        console.log("Fetching cluster balance:", {
          clusterHash: cluster.clusterId,
          migrated: cluster.migrated,
          functionName,
          contractAddress: networkDetails.getterContractAddress,
          ownerAddress: cluster.ownerAddress,
          operatorIds,
          clusterData,
        })

        const result = await publicClient.readContract({
          address: networkDetails.getterContractAddress as Address,
          abi: ssvNetworkViewsAbi,
          functionName,
          args: [
            cluster.ownerAddress as Address,
            operatorIds as unknown as readonly bigint[],
            clusterData,
          ],
        })

        console.log("Contract balance result:", result)
        setBalance(result)
      } catch (err) {
        console.error("Error fetching cluster balance:", {
          clusterHash: cluster.clusterId,
          error: err,
          errorMessage: err instanceof Error ? err.message : "Unknown error",
          errorStack: err instanceof Error ? err.stack : undefined,
        })
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [cluster, network])

  return { balance, isLoading, error }
}
