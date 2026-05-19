"use client"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { RouteTabLink } from "@/components/ui/route-tab-link"

interface TableNavigationProps {
  publicKey: string
}

export function TableNavigation({ publicKey }: TableNavigationProps) {
  const network = useNetworkParam()

  return (
    <div className="flex items-center gap-2 overflow-auto">
      <RouteTabLink href={`/${network}/validator/${publicKey}/`}>
        Duties
      </RouteTabLink>
      <RouteTabLink href={`/${network}/validator/${publicKey}/history`}>
        Validator History
      </RouteTabLink>
    </div>
  )
}
