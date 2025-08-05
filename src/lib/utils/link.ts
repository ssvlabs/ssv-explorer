"use client"

import { type UrlObject } from "url"

import { chainNames, type ChainName } from "@/config/chains"

const networkRegex = new RegExp(`(${chainNames.join("|")})`)
export const getNetworkName = (): ChainName => {
  const result = networkRegex.exec(location.pathname)
  return (result?.[0] as ChainName) ?? "mainnet"
}

export const withNetwork = <T extends string | UrlObject>(url: T): T => {
  const pathname = (typeof url === "string" ? url : url.pathname) ?? ""

  const base = new URL(location.pathname, "http://x")
  const resolved = new URL(pathname, base)

  const resolvedPathname = networkRegex.test(resolved.pathname)
    ? resolved.pathname
    : `/${getNetworkName()}${resolved.pathname}`

  if (typeof url === "string") return resolvedPathname as T
  if (typeof url === "object")
    return { ...url, pathname: resolvedPathname } as T
  return url
}
