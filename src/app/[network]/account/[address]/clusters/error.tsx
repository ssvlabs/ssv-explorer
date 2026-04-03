"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function AccountClustersRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load account clusters"
      fallbackMessage="We couldn't load clusters for this account."
    />
  )
}
