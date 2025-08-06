"use client"

import Link from "next/link"

import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { Button } from "@/components/ui/button"
import { ErrorCard } from "@/components/ui/error-card"

export default function NotFound() {
  const network = useNetworkParam()
  return (
    <div className="flex size-full flex-col items-center justify-center py-10">
      <ErrorCard
        errorMessage="Page not found"
        title="404 - Page Not Found"
        className="bg-transparent"
      />
      <Button as={Link} href={`/${network}/overview`}>
        Go to home
      </Button>
    </div>
  )
}
