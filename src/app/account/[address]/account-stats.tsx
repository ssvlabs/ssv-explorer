"use client"

import type { ComponentPropsWithRef, FC } from "react"
import type { Address } from "viem"

import { cn } from "@/lib/utils"
import { useAccountStats } from "@/hooks/account/use-account-stats"
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
  return (
    <div
      className={cn("flex items-center gap-6 align-sub", className)}
      {...props}
    >
      <Stat
        className="flex-1"
        title="Validators"
        tooltip="Total number of validators"
        content={stats.data?.validators}
        isContentLoading={stats.isPending}
      />
      <div className="h-full border-r border-gray-500" />
      <Stat
        className="flex-1"
        title="Clusters"
        tooltip="Total number of clusters"
        content={stats.data?.clusters}
        isContentLoading={stats.isPending}
      />
      <Stat
        className="flex-1"
        title="Operators"
        tooltip="Total number of operators"
        content={stats.data?.operators}
        isContentLoading={stats.isPending}
      />
    </div>
  )
}

AccountStats.displayName = "AccountStats"
