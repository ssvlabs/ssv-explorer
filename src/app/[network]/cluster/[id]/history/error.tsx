"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ClusterHistoryRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load cluster history"
      fallbackMessage="We couldn't load cluster history right now."
    />
  )
}
