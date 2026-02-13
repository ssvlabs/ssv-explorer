import { NextResponse, type NextRequest } from "next/server"

import { ChainName, chainNames } from "@/config/chains"
import { resolveDomainChainName } from "@/lib/server-utils/network-param"

export function proxy(request: NextRequest) {
  const hostname =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? ""
  const domainNetwork = resolveDomainChainName(hostname)

  const { pathname } = request.nextUrl

  const segments = pathname.split("/").filter(Boolean)
  const url = request.nextUrl.clone()

  if (segments.length === 0) {
    url.pathname = `/${domainNetwork}/overview`
    return NextResponse.redirect(url)
  }

  const [pathNetwork, ...rest] = segments
  if (
    !chainNames.includes(pathNetwork! as ChainName) ||
    pathNetwork === domainNetwork
  )
    return NextResponse.next()

  const restPath = rest.length ? `/${rest.join("/")}` : ""
  url.pathname = `/${domainNetwork}${restPath}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|icon.png|opengraph-image.png).*)",
  ],
}
