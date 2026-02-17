"use client"

import type { ComponentPropsWithRef, FC } from "react"
import { FaEthereum } from "react-icons/fa"
import { type Address } from "viem"

import { cn } from "@/lib/utils"
import { formatGwei, numberFormatter } from "@/lib/utils/number"
import { useAccountStats } from "@/hooks/account/use-account-stats"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { Stat } from "@/components/ui/stat"

export type AccountStatsProps = {
  ownerAddress: Address
}

type AccountStatsFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof AccountStatsProps> &
    AccountStatsProps
>

export const AccountStats: AccountStatsFC = ({
  className,
  ownerAddress,
  ...props
}) => {
  const stats = useAccountStats(ownerAddress)
  const nativeCurrency = useNativeCurrency()
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6",
        className
      )}
      {...props}
    >
      <Stat
        title={`${nativeCurrency.symbol} Managed`}
        tooltip={`Total amount of ${nativeCurrency.symbol} managed by operators in this account`}
        content={
          <div className="flex items-center gap-0.5">
            <FaEthereum className="size-5" />
            {BigInt(stats.data?.totalOperatorEthManaged || 0n).toString()}
          </div>
        }
        isContentLoading={stats.isPending}
      />
      <Stat
        title="Effective Balance"
        tooltip="Total effective balance across all validators in this account"
        content={
          <div className="flex items-center gap-0.5">
            <FaEthereum className="size-5" />
            {formatGwei(BigInt(stats.data?.effectiveBalance || 0n))}
          </div>
        }
        isContentLoading={stats.isPending}
      />
      <Stat
        title="Operators"
        tooltip="Total number of operators managed by this account"
        content={numberFormatter.format(stats.data?.operators || 0)}
        isContentLoading={stats.isPending}
      />
      <Stat
        title="Clusters"
        tooltip="Total number of clusters managed by this account"
        content={numberFormatter.format(stats.data?.clusters || 0)}
        isContentLoading={stats.isPending}
      />
      <Stat
        title="Validators"
        tooltip="Total number of validators managed by this account"
        content={numberFormatter.format(stats.data?.validators || 0)}
        isContentLoading={stats.isPending}
      />
    </div>
  )
}

AccountStats.displayName = "AccountStats"
