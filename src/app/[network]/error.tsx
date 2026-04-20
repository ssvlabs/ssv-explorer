"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function NetworkRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load network page"
      fallbackMessage="Please try reloading this network route."
    />
  )
}
