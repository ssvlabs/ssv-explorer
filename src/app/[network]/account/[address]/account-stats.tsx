"use client"

import type { ComponentPropsWithRef, FC, ReactNode } from "react"
import { FaEthereum, FaInfoCircle } from "react-icons/fa"
import { type Address } from "viem"

import { cn } from "@/lib/utils"
import { formatGwei, numberFormatter } from "@/lib/utils/number"
import { useAccountStats } from "@/hooks/account/use-account-stats"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"

export type AccountStatsProps = {
  ownerAddress: Address
}

type AccountStatsFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof AccountStatsProps> &
    AccountStatsProps
>

type AccountStatItemProps = {
  title: string
  tooltip: string
  value: ReactNode
  isLoading?: boolean
  icon?: ReactNode
  className?: string
}

const AccountStatItem: FC<AccountStatItemProps> = ({
  title,
  tooltip,
  value,
  isLoading,
  icon,
  className,
}) => (
  <div className={cn("flex flex-col gap-1.5 md:min-w-[180px]", className)}>
    <Tooltip content={tooltip}>
      <div className="flex items-center gap-1">
        <Text variant="body-3-medium" className="text-gray-500">
          {title}
        </Text>
        <FaInfoCircle className="size-5 text-gray-500" />
      </div>
    </Tooltip>
    {isLoading ? (
      <Skeleton className="h-7 w-24" />
    ) : (
      <div className="flex items-center gap-1">
        {icon}
        <Text variant="headline4" className="text-gray-800">
          {value}
        </Text>
      </div>
    )}
  </div>
)

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
        "flex flex-col gap-4 md:flex-row md:flex-wrap md:items-stretch md:gap-x-8 md:gap-y-6",
        className
      )}
      {...props}
    >
      <AccountStatItem
        className="md:flex-1 md:pr-[60px]"
        title={`${nativeCurrency.symbol} Managed`}
        tooltip={`Total amount of ${nativeCurrency.symbol} managed by operators in this account`}
        value={BigInt(stats.data?.totalOperatorEthManaged || 0n)}
        icon={<FaEthereum className="size-[22px] text-gray-800" />}
        isLoading={stats.isPending}
      />
      <Separator
        orientation="vertical"
        className="hidden bg-gray-200 md:block md:h-auto md:self-stretch"
      />
      <AccountStatItem
        className="md:flex-1 md:pr-[60px]"
        title="Effective Balance"
        tooltip="Total effective balance across all validators in this account"
        value={formatGwei(BigInt(stats.data?.effectiveBalance || 0n))}
        icon={<FaEthereum className="size-[22px] text-gray-800" />}
        isLoading={stats.isPending}
      />
      <Separator
        orientation="vertical"
        className="hidden bg-gray-200 md:block md:h-auto md:self-stretch"
      />
      <AccountStatItem
        className="md:flex-1 md:pr-[60px]"
        title="Operators"
        tooltip="Total number of operators managed by this account"
        value={numberFormatter.format(stats.data?.operators || 0)}
        isLoading={stats.isPending}
      />
      <Separator
        orientation="vertical"
        className="hidden bg-gray-200 md:block md:h-auto md:self-stretch"
      />
      <AccountStatItem
        className="md:flex-1 md:pr-[60px]"
        title="Clusters"
        tooltip="Total number of clusters managed by this account"
        value={numberFormatter.format(stats.data?.clusters || 0)}
        isLoading={stats.isPending}
      />
      <Separator
        orientation="vertical"
        className="hidden bg-gray-200 md:block md:h-auto md:self-stretch"
      />
      <AccountStatItem
        className="md:flex-1 md:pr-[60px]"
        title="Validators"
        tooltip="Total number of validators managed by this account"
        value={numberFormatter.format(stats.data?.validators || 0)}
        isLoading={stats.isPending}
      />
    </div>
  )
}

AccountStats.displayName = "AccountStats"
