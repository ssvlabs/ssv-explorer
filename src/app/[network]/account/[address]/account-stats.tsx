"use client"

import type { ComponentPropsWithRef, FC } from "react"
import { type Address } from "viem"

import { cn } from "@/lib/utils"
import { formatGwei, numberFormatter } from "@/lib/utils/number"
import { useAccountStats } from "@/hooks/account/use-account-stats"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { Stat } from "@/components/ui/stat"
import { Span, Text } from "@/components/ui/text"

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
        "flex flex-col gap-2 align-sub md:flex-row md:items-center md:gap-6",
        className
      )}
      {...props}
    >
      <Stat
        className="flex-1"
        title="Validators"
        tooltip="Total number of validators managed by this account"
        content={numberFormatter.format(stats.data?.validators || 0)}
        subContent={
          <Text variant="overline" className="text-gray-500">
            {nativeCurrency.symbol} Staked:{" "}
            <Span variant="caption-bold" className="text-gray-600">
              {`${formatGwei(BigInt(stats.data?.effectiveBalance || 0n))} ${nativeCurrency.symbol}`}
            </Span>
          </Text>
        }
        isContentLoading={stats.isPending}
      />
      <div className="h-full border-r border-gray-500" />
      <Stat
        className="flex-1"
        title="Clusters"
        tooltip="Total number of clusters managed by this account"
        content={numberFormatter.format(stats.data?.clusters || 0)}
        isContentLoading={stats.isPending}
      />
      <Stat
        className="flex-1"
        title="Operators"
        tooltip="Total number of operators managed by this account"
        content={numberFormatter.format(stats.data?.operators || 0)}
        isContentLoading={stats.isPending}
        subContent={
          Number(stats.data?.totalOperatorEthManaged) > 0 && (
            <Text variant="overline" className="text-gray-500">
              Total ETH managed:{" "}
              <Span variant="caption-bold" className="text-gray-600">
                {`${stats.data?.totalOperatorEthManaged || 0n} ${nativeCurrency.symbol}`}
              </Span>
            </Text>
          )
        }
      />
    </div>
  )
}

AccountStats.displayName = "AccountStats"
