"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function AccountOperatorsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load account operators"
      fallbackMessage="We couldn't load operators for this account."
    />
  )
}
