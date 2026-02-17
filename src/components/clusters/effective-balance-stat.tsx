"use client"

import type { ComponentPropsWithRef, FC } from "react"
import { type Hex } from "viem"

import { getNativeCurrency, type ChainName } from "@/config/chains"
import { formatGwei } from "@/lib/utils/number"
import { useClusterEffectiveBalance } from "@/hooks/queries/use-cluster-effective-balance"
import { Stat, type StatProps } from "@/components/ui/stat"

export type EffectiveBalanceStatProps = Partial<StatProps> & {
  clusterId: Hex
  network: ChainName
  fallbackBalance: string
}

type EffectiveBalanceStatFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof EffectiveBalanceStatProps> &
    EffectiveBalanceStatProps
>

export const EffectiveBalanceStat: EffectiveBalanceStatFC = ({
  clusterId,
  network,
  fallbackBalance,
  title,
  content,
  tooltip,
  subContent,
  isContentLoading,
  className,
  ...props
}) => {
  const nativeCurrency = getNativeCurrency(network)

  const { data: effectiveBalance = BigInt(fallbackBalance || "0"), isLoading } =
    useClusterEffectiveBalance({
      clusterId,
      network,
    })

  return (
    <Stat
      className={className}
      title={title || `Total ${nativeCurrency.symbol}`}
      isContentLoading={isContentLoading ?? isLoading}
      content={
        content || formatGwei(effectiveBalance) + ` ${nativeCurrency.symbol}`
      }
      tooltip={tooltip}
      subContent={subContent}
      {...props}
    />
  )
}

EffectiveBalanceStat.displayName = "EffectiveBalanceStat"
