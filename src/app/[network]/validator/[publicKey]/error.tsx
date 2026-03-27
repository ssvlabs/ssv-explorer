"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ValidatorDetailsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load validator details"
      fallbackMessage="We couldn't load this validator right now."
    />
  )
}
