"use client"

import { useParams } from "next/navigation"

import { type ChainName } from "@/config/chains"
import { extractNetworkParam } from "@/lib/server-utils/network-param"

export const useNetworkParam = () => {
  const params = useParams<{ network: ChainName }>()
  const host =
    typeof window === "undefined" ? undefined : window.location.hostname
  return extractNetworkParam(params, { host })
}
