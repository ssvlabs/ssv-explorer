/* eslint-disable @next/next/no-img-element */
"use client"

import { usePathname } from "next/navigation"

import { currencyFormatter } from "@/lib/utils/number"
import { useSSVRates } from "@/hooks/use-ssv-rates"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { ThemeToggle } from "@/components/layouts/mode-toggle"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Link } from "@/components/nextjs/custom-link"
import { cn } from "@/lib/utils"

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
          <Button
            as={Link}
            href="https://app.ssv.network/join"
            target="_blank"
            variant="default"
            className={cn("w-fit gap-1 px-3 font-sans text-sm capitalize")}
            colorScheme="light"
          >
            Join SSV
          </Button>
          <ThemeToggle />
        </nav>
      </div>
      <div className="flex h-[60px] items-center justify-between gap-6">
        <div className="flex gap-6">
          <Text
            as={Link}
            variant="body-3-medium"
            href="/overview"
            className="data-[active=true]:text-primary-500"
          >
            Overview
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/operators"
            className="data-[active=true]:text-primary-500"
          >
            Operators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/validators"
            className="data-[active=true]:text-primary-500"
          >
            Validators
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/clusters"
            className="data-[active=true]:text-primary-500"
          >
            Clusters
          </Text>
          <Text
            as={Link}
            variant="body-3-medium"
            href="/accounts"
            className="data-[active=true]:text-primary-500"
          >
            Accounts
          </Text>
        </div>
        {!isOverview && <GlobalSearch className="w-[600px] max-w-full" />}
      </div>
    </header>
  )
}
