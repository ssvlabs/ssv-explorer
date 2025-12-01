import * as React from "react"
import { type LinkProps } from "next/link"

import { Tab } from "@/components/ui/tab"
import { Link } from "@/components/nextjs/custom-link"

import { type ButtonProps } from "./button"

type TabProps = {
  count?: number
}

export const RouteTabLink = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & TabProps & LinkProps
>((props, ref) => {
  return <Tab as={Link} {...props} ref={ref}></Tab>
})

RouteTabLink.displayName = "RouteTabLink"
