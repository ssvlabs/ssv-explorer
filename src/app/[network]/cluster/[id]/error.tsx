"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ClusterDetailsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load cluster details"
      fallbackMessage="We couldn't load this cluster right now."
    />
  )
}
