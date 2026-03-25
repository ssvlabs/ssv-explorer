"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ClustersRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load clusters"
      fallbackMessage="We couldn't load clusters for this network."
    />
  )
}
