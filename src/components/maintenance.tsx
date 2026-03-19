"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/lib/utils/number"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { useSSVRates } from "@/hooks/use-ssv-rates"
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { ThemeSwitcher } from "@/components/layouts/theme-switcher"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"
import { ValueChangeIndicator } from "@/components/value-change-indicator"

const DISCORD_LINK = "https://discord.com/invite/ssvnetworkofficial"

export const Maintenance = () => {
  const network = useNetworkParam()
  const { data: rates } = useSSVRates()
  return (
    <div className="flex h-screen w-full flex-col items-center">
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
      </header>
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src="/images/maintenance.svg" alt="Maintenance" className="w-40" />
        <Text variant="headline2" className="mt-16 text-gray-700">
          The site is currently down for maintenance
        </Text>
        <div className="mt-7 flex flex-col gap-2 text-center">
          <Text variant="body-1-medium">
            We&apos;ll be back up and running again shortly
          </Text>
          <Text variant="body-3-medium" className="text-gray-600">
            You can reach us on{" "}
            <Button variant="link" as="a" href={DISCORD_LINK} target="_blank">
              Discord
            </Button>
          </Text>
        </div>
      </div>
    </div>
  )
}
