"use client"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { RouteTabLink } from "@/components/ui/route-tab-link"

interface TableNavigationProps {
  clusterId: string
  validatorCount?: number
}

export function TableNavigation({
  clusterId,
  validatorCount,
}: TableNavigationProps) {
  const network = useNetworkParam()

  return (
    <div className="flex items-center gap-2 overflow-auto">
      <RouteTabLink
        count={validatorCount}
        href={`/${network}/cluster/${clusterId}/`}
      >
        Validators
      </RouteTabLink>
      <RouteTabLink href={`/${network}/cluster/${clusterId}/history`}>
        Cluster History
      </RouteTabLink>
    </div>
  )
}
