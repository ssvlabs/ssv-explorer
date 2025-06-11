/* eslint-disable @next/next/no-img-element */
"use client"

import { usePathname } from "next/navigation"

import { useSSVRates } from "@/hooks/use-ssv-rates"

import { SiteHeaderMobile } from "./site-header-mobile"

export function SiteHeader() {
  const pathname = usePathname()
  const isOverview = pathname.startsWith("/overview")
  const { data: rates } = useSSVRates()

  return <SiteHeaderMobile />
}
