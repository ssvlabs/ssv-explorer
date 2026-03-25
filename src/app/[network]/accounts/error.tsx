"use client"

import RouteError, { type RouteErrorProps } from "@/app/_components/route-error"

export default function AccountsRouteError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="Couldn't load accounts"
      fallbackMessage="We couldn't load accounts for this network."
    />
  )
}
