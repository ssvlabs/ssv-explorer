"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function ValidatorHistoryRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load validator history"
      fallbackMessage="We couldn't load validator history right now."
    />
  )
}
