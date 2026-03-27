"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function AccountDetailsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load account details"
      fallbackMessage="We couldn't load this account right now."
    />
  )
}
