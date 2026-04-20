"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function AccountHistoryRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load account history"
      fallbackMessage="We couldn't load history for this account."
    />
  )
}
