"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/lib/utils/number"
import { wait } from "@/lib/utils/promise"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { useSSVRates } from "@/hooks/use-ssv-rates"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { ThemeSwitcher } from "@/components/layouts/theme-switcher"
import { Logo } from "@/components/logo"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Link } from "@/components/nextjs/custom-link"

export function MobileSiteHeader() {
  const network = useNetworkParam()
  const pathname = usePathname()
  const isOverview = pathname.includes(`/${network}/overview`)
  const { data: rates } = useSSVRates()
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    console.log("handleLinkClick")
    setIsOpen(false)
  }

  return (
    <>
      <header className="container w-full px-6 backdrop-blur md:hidden">
        <div className="flex h-[60px] items-center justify-between gap-2 font-mono">
          <Link href={`/${network}/overview`}>
            <Logo width={140} height={28} />
          </Link>
          <div className="flex-1" />
          <NetworkSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-0 p-0">
              <div className="flex h-[60px] items-center justify-between px-5">
                <Link href={`/${network}/overview`}>
                  <Logo width={140} height={28} />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="size-4" />
                  </Button>
                </SheetClose>
              </div>
              <Separator className="bg-gray-300" />

              <div className="flex flex-1 flex-col py-2">
                <Button
                  variant="ghost"
                  onClick={handleLinkClick}
                  className="h-14 justify-start rounded-none px-5"
                >
                  <Text
                    as={Link}
                    variant="body-3-medium"
                    href={`/${network}/overview`}
                    className="data-[active=true]:text-primary-500"
                  >
                    Overview
                  </Text>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLinkClick}
                  className="h-14 justify-start rounded-none px-5"
                >
                  <Text
                    as={Link}
                    variant="body-3-medium"
                    href={`/${network}/operators`}
                    className="data-[active=true]:text-primary-500"
                  >
                    Operators
                  </Text>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLinkClick}
                  className="h-14 justify-start rounded-none px-5"
                >
                  <Text
                    as={Link}
                    variant="body-3-medium"
                    href={`/${network}/validators`}
                    className="data-[active=true]:text-primary-500"
                  >
                    Validators
                  </Text>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLinkClick}
                  className="h-14 justify-start rounded-none px-5"
                >
                  <Text
                    as={Link}
                    variant="body-3-medium"
                    href={`/${network}/clusters`}
                    className="data-[active=true]:text-primary-500"
                  >
                    Clusters
                  </Text>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLinkClick}
                  className="h-14 justify-start rounded-none px-5"
                >
                  <Text
                    as={Link}
                    variant="body-3-medium"
                    href={`/${network}/accounts`}
                    className="data-[active=true]:text-primary-500"
                  >
                    Accounts
                  </Text>
                </Button>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-2 px-3 py-[10px]">
                <NetworkSwitcher
                  className="flex-1 bg-gray-200 hover:brightness-105"
                  onSelect={async () => {
                    await wait(300)
                    setIsOpen(false)
                  }}
                />
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
                <div className="flex-1" />
                <ThemeSwitcher />
              </div>
              <Separator className="bg-gray-300" />
              <div className="flex h-10 items-center px-5">
                <Text variant="caption-medium" className="font-sans">
                  <span className="text-gray-500">SSV Price: </span>
                  <span className="text-primary-500">
                    {currencyFormatter.format(rates?.ssv ?? 0)}
                  </span>
                </Text>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {!isOverview && <GlobalSearch className="w-[600px] max-w-full" />}
      </header>
    </>
  )
}
