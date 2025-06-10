"use client"

import { type UrlObject } from "url"
import { forwardRef, type ComponentProps } from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { isString, isUndefined } from "lodash-es"

type LinkProps = ComponentProps<typeof NextLink> & {
  activeClassName?: string
}

const isRouteActive = (href: string | UrlObject, pathname: string) => {
  let _href = isString(href)
    ? href.replace(/\/$/, "")
    : href.pathname?.replace(/\/$/, "")

  if (isUndefined(_href)) return false

  // Handle relative paths using URL resolution (matches Next.js )
  if (_href.includes(".")) {
    try {
      const base = new URL(pathname, "http://placeholder")
      const resolved = new URL(_href, base)
      _href = resolved.pathname.replace(/\/$/, "")
    } catch {
      return false
    }
  }

  const _pathname = pathname.replace(/\/$/, "")
  return _pathname === _href
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    const pathname = usePathname()
    return (
      <NextLink
        {...props}
        ref={ref}
        data-active={isRouteActive(props.href, pathname)}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "Link"
