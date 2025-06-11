/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { RxHamburgerMenu } from "react-icons/rx"

import { currencyFormatter } from "@/lib/utils/number"
import { useSSVRates } from "@/hooks/use-ssv-rates"
import { Button, IconButton } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { ThemeToggle } from "@/components/layouts/mode-toggle"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Link } from "@/components/nextjs/custom-link"

export function SiteHeaderMobile() {
  const pathname = usePathname()
  const isOverview = pathname.startsWith("/overview")
  const { data: rates } = useSSVRates()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="container w-full whitespace-nowrap backdrop-blur">
      <div className="flex h-[60px] items-center justify-between border-b border-gray-300 font-mono">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <Logo width={140} height={28} />
        </Link>

        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <IconButton variant="ghost" className="rounded-lg">
              <RxHamburgerMenu className="size-3" />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-6 py-6">
            <div className="flex items-center justify-between gap-6 px-6">
              <Link
                href="/"
                className="mr-2 flex min-w-[140px] items-center md:mr-6 md:space-x-2"
              >
                <Logo width={140} height={28} />
              </Link>
              <DrawerClose asChild>
                <IconButton variant="ghost" className="rounded-lg">
                  <X className="size-3 text-gray-600" />
                </IconButton>
              </DrawerClose>
            </div>
            <div className="flex items-center justify-between gap-6 px-6">
              <Text
                variant="caption-medium"
                className="whitespace-nowrap font-sans"
              >
                <span className="text-gray-500">SSV Price: </span>
                <span className="text-primary-500">
                  {currencyFormatter.format(rates?.ssv ?? 0)}
                </span>
              </Text>
              <div className="flex items-center gap-2">
                <NetworkSwitcher />
                <ThemeToggle />
              </div>
            </div>
            <div className="flex flex-col">
              <DrawerClose asChild>
                <Button
                  as={Link}
                  href="/overview"
                  variant="drawer-link"
                  size="sm"
                  className="h-10 px-6 data-[active=true]:text-primary-500"
                >
                  Overview
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <Button
                  as={Link}
                  href="/operators"
                  variant="drawer-link"
                  size="sm"
                  className="h-10 px-6 data-[active=true]:text-primary-500"
                >
                  Operators
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <Button
                  as={Link}
                  href="/validators"
                  variant="drawer-link"
                  size="sm"
                  className="h-10 px-6 data-[active=true]:text-primary-500"
                >
                  Validators
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <Button
                  as={Link}
                  href="/clusters"
                  variant="drawer-link"
                  size="sm"
                  className="h-10 px-6 data-[active=true]:text-primary-500"
                >
                  Clusters
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <Button
                  as={Link}
                  href="/accounts"
                  variant="drawer-link"
                  size="sm"
                  className="h-10 px-6 data-[active=true]:text-primary-500"
                >
                  Accounts
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {!isOverview && (
        <div className="flex h-[60px] items-center justify-between gap-6">
          <GlobalSearch className="w-[600px] max-w-full" />
        </div>
      )}
    </header>
  )
}
