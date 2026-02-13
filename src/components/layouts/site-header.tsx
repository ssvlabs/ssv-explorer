"use client"

/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/lib/utils/number"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { useSSVRates } from "@/hooks/use-ssv-rates"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { MobileSiteHeader } from "@/components/layouts/mobile-site-header"
import { ThemeSwitcher } from "@/components/layouts/theme-switcher"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Link } from "@/components/nextjs/custom-link"
import { ValueChangeIndicator } from "@/components/value-change-indicator"

export function SiteHeader() {
  const network = useNetworkParam()
  const pathname = usePathname()
  const isOverview = pathname.includes(`/${network}/overview`)
  const { data: rates } = useSSVRates()

  return (
    <>
      <MobileSiteHeader />
      <header className="container hidden w-full px-6 backdrop-blur md:block">
        <div className="flex h-[60px] items-center border-b border-gray-300 font-mono">
          <Link
            href={`/${network}/overview`}
            className="mr-2 flex items-center md:mr-6"
          >
            <Logo width={140} height={28} />
          </Link>
          <nav className="flex flex-1 items-center gap-2 md:justify-end">
            <Text
              variant="caption-medium"
              className="flex gap-1 px-3 font-sans"
            >
              <span className="text-gray-500">SSV Price: </span>
              <span className="text-primary-500">
                {currencyFormatter.format(rates?.price ?? 0)}
              </span>
              <ValueChangeIndicator value={rates?.change} />
            </Text>
            <NetworkSwitcher />
            <Button
              as={Link}
              href="https://explorer.hoodi.ssv.network/"
              target="_blank"
              variant="secondary"
              className={cn(
                "w-fit gap-1 border border-primary-200 bg-primary-100 px-3 font-sans text-sm capitalize text-primary-500 hover:bg-primary-200"
              )}
            >
              Testnet Explorer
            </Button>
            <Button
              as={Link}
              href="https://app.ssv.network/join"
              target="_blank"
              variant="secondary"
              className={cn(
                "w-fit gap-1 border border-primary-200 bg-primary-100 px-3 font-sans text-sm capitalize text-primary-500 hover:bg-primary-200"
              )}
            >
              Join SSV
            </Button>
            <ThemeSwitcher className="ml-1" />
          </nav>
        </div>
        <div className="flex h-[60px] items-center justify-between gap-6">
          <div className="flex gap-6">
            <Text
              as={Link}
              variant="body-3-medium"
              href={`/${network}/overview`}
              className="data-[active=true]:text-primary-500"
            >
              Overview
            </Text>
            <Text
              as={Link}
              variant="body-3-medium"
              href={`/${network}/operators`}
              className="data-[active=true]:text-primary-500"
            >
              Operators
            </Text>
            <Text
              as={Link}
              variant="body-3-medium"
              href={`/${network}/validators`}
              className="data-[active=true]:text-primary-500"
            >
              Validators
            </Text>
            <Text
              as={Link}
              variant="body-3-medium"
              href={`/${network}/clusters`}
              className="data-[active=true]:text-primary-500"
            >
              Clusters
            </Text>
            <Text
              as={Link}
              variant="body-3-medium"
              href={`/${network}/accounts`}
              className="data-[active=true]:text-primary-500"
            >
              Accounts
            </Text>
          </div>
          {!isOverview && <GlobalSearch className="w-[600px] max-w-full" />}
        </div>
      </header>
    </>
  )
}
