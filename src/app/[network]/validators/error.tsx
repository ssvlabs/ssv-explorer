"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ValidatorsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load validators"
      fallbackMessage="We couldn't load validators for this network."
    />
  )
}
