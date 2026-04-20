"use client"

import { useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ErrorCard } from "@/components/ui/error-card"

export type RouteErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
  className?: string
  title?: string
  fallbackMessage?: string
}

export default function RouteError({
  error,
  reset,
  className,
  title = "Something went wrong",
  fallbackMessage = "An unexpected error occurred while loading this page.",
}: RouteErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-4 p-6",
        className
      )}
    >
      <ErrorCard
        className="w-full max-w-2xl bg-transparent"
        title={title}
        errorMessage={error.message || fallbackMessage}
      />
      <Button onClick={reset} variant="secondary">
        Try again
      </Button>
    </div>
  )
}
