"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function OperatorsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load operators"
      fallbackMessage="We couldn't load operators for this network."
    />
  )
}
