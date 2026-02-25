"use client"

import Image from "next/image"

import { type Cluster } from "@/types/api"
import { type ChainName } from "@/config/chains"
import { formatSSV } from "@/lib/utils/number"
import { useClusterContractBalance } from "@/hooks/contracts/use-cluster-contract-balance"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"

export const ClusterBalanceStat = ({
  cluster,
  network,
}: {
  cluster: Cluster
  network: ChainName
}) => {
  const { balance, isLoading, error } = useClusterContractBalance({
    cluster,
    network,
  })

  if (error) {
    return (
      <Stat
        title="Current Balance"
        content={<Text className="text-error-500">Failed to load</Text>}
      />
    )
  }

  const displayBalance = balance ?? 0n
  const currencySymbol = cluster.migrated ? "ETH" : "SSV"
  const currencyIcon = cluster.migrated
    ? "/images/networks/dark.svg"
    : "/images/ssvIcons/icon.svg"

  return (
    <Stat
      title="Current Balance"
      isContentLoading={isLoading}
      content={
        <div className="flex items-center gap-0.5">
          <Image
            src={currencyIcon}
            alt={currencySymbol}
            width={20}
            height={20}
            className="object-fit size-5"
          />
          <Text>
            {formatSSV(displayBalance)} {currencySymbol}
          </Text>
        </div>
      }
    />
  )
}
