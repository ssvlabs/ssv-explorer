/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/lib/utils/number"
import { useSSVRates } from "@/hooks/use-ssv-rates"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { ThemeToggle } from "@/components/layouts/mode-toggle"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"

export function SiteHeader() {
  const pathname = usePathname()
  const isOverview = pathname.startsWith("/overview")
  const { data: rates } = useSSVRates()

  return (
    <header className="container w-full backdrop-blur">
      <div className="flex h-[60px] items-center border-b border-gray-300 font-mono">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <Logo width={140} height={28} />
        </Link>

        <nav className="flex flex-1 items-center gap-2 md:justify-end">
          <Text variant="caption-medium" className="px-3 font-sans">
            <span className="text-gray-500">SSV Price: </span>
            <span className="text-primary-500">
              {currencyFormatter.format(rates?.ssv ?? 0)}
            </span>
          </Text>
          <NetworkSwitcher />
          <ThemeToggle />
        </nav>
      </div>
      <div className="flex h-[60px] items-center justify-between gap-6">
        <div className="flex gap-6">
          <Text
            as={Link}
            variant="body-3-medium"
            href="/overview"
            className={cn({
              "text-primary-500": pathname === "/overview",
            })}
          >
            Overview
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/operators"
            className={cn({
              "text-primary-500": pathname === "/operators",
            })}
          >
            Operators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/validators"
            className={cn({
              "text-primary-500": pathname === "/validators",
            })}
          >
            Validators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/clusters"
            className={cn({
              "text-primary-500": pathname === "/clusters",
            })}
          >
            Clusters
          </Text>
          {/* <Text
            as={Link}
            variant="body-3-medium"
            href="/accounts"
            className={cn({
              "text-primary-500": pathname === "/accounts",
            })}
          >
            Accounts
          </Text> */}
        </div>
        {!isOverview && <GlobalSearch className="w-[600px] max-w-full" />}
      </div>
    </header>
  )
}
