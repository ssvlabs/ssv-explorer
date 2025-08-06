"use client"

import { type Address } from "viem"

import { withNetwork } from "@/lib/utils/link"
import { useAccountStats } from "@/hooks/account/use-account-stats"
import { RouteTabLink } from "@/components/ui/route-tab-link"

interface TableNavigationProps {
  ownerAddress: Address
}

export function TableNavigation({ ownerAddress }: TableNavigationProps) {
  const stats = useAccountStats(ownerAddress)
  return (
    <div className="flex items-center gap-2">
      <RouteTabLink
        href={withNetwork(`/account/${ownerAddress}/`)}
        count={stats.data?.validators}
      >
        Validators
      </RouteTabLink>
      <RouteTabLink
        href={withNetwork(`/account/${ownerAddress}/clusters`)}
        count={stats.data?.clusters}
      >
        Clusters
      </RouteTabLink>
      <RouteTabLink
        href={withNetwork(`/account/${ownerAddress}/operators`)}
        count={stats.data?.operators}
      >
        Operators
      </RouteTabLink>
      <RouteTabLink href={withNetwork(`/account/${ownerAddress}/history`)}>
        History
      </RouteTabLink>
    </div>
  )
}
