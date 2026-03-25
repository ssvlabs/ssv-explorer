"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function OperatorHistoryRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load operator history"
      fallbackMessage="We couldn't load this operator's history right now."
    />
  )
}
