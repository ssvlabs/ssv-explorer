"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function OperatorDetailsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load operator details"
      fallbackMessage="We couldn't load this operator right now."
    />
  )
}
