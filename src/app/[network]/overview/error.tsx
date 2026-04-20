"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function OverviewRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load overview"
      fallbackMessage="We couldn't load network overview data."
    />
  )
}
