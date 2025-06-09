"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type Address } from "viem"

import { useAccountStats } from "@/hooks/account/use-account-stats"
import { Tab } from "@/components/ui/tab"

interface TableNavigationProps {
  ownerAddress: Address
}

export function TableNavigation({ ownerAddress }: TableNavigationProps) {
  const pathname = usePathname()
  const stats = useAccountStats(ownerAddress)

  return (
    <div className="flex items-center gap-2">
      <Tab
        as={Link}
        isActive={pathname.includes("/validators")}
        href={`/account/${ownerAddress}/validators`}
        count={stats.data?.validators}
      >
        Validators
      </Tab>
      <Tab
        as={Link}
        isActive={pathname.includes("/clusters")}
        href={`/account/${ownerAddress}/clusters`}
        count={stats.data?.clusters}
      >
        Clusters
      </Tab>
      <Tab
        as={Link}
        isActive={pathname.includes("/operators")}
        href={`/account/${ownerAddress}/operators`}
        count={stats.data?.operators}
      >
        Operators
      </Tab>
    </div>
  )
}
