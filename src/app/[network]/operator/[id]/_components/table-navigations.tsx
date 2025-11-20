"use client"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { RouteTabLink } from "@/components/ui/route-tab-link"

interface TableNavigationProps {
  operatorId: string
  validatorCount: number
}

export function TableNavigation({
  operatorId,
  validatorCount,
}: TableNavigationProps) {
  const network = useNetworkParam()
  return (
    <div className="flex items-center gap-2 overflow-auto">
      <RouteTabLink
        count={validatorCount}
        href={`/${network}/operator/${operatorId}/`}
      >
        Validators
      </RouteTabLink>
      <RouteTabLink href={`/${network}/operator/${operatorId}/history`}>
        Operator History
      </RouteTabLink>
    </div>
  )
}
