"use client"

import { type Address } from "viem"

import { useAccountStats } from "@/hooks/account/use-account-stats"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { RouteTabLink } from "@/components/ui/route-tab-link"

interface TableNavigationProps {
  ownerAddress: Address
}

export function TableNavigation({ ownerAddress }: TableNavigationProps) {
  const stats = useAccountStats(ownerAddress)
  const network = useNetworkParam()
  return (
    <div className="flex items-center gap-2 overflow-auto">
      <RouteTabLink
        href={`/${network}/account/${ownerAddress}/operators`}
        count={stats.data?.operators}
      >
        Operators
      </RouteTabLink>
      <RouteTabLink
        href={`/${network}/account/${ownerAddress}/clusters`}
        count={stats.data?.clusters}
      >
        Clusters
      </RouteTabLink>
      <RouteTabLink
        href={`/${network}/account/${ownerAddress}/`}
        count={stats.data?.validators}
      >
        Validators
      </RouteTabLink>
      <RouteTabLink href={`/${network}/account/${ownerAddress}/history`}>
        Account History
      </RouteTabLink>
    </div>
  )
}
