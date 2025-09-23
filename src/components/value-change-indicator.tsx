import React from "react"

import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"

type PriceChangeIndicatorProps = {
  value: number | undefined
}

export function ValueChangeIndicator({ value }: PriceChangeIndicatorProps) {
  if (!value) {
    return null
  }

  const isUp = value > 0
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        isUp ? "text-success-500" : "text-error-500"
      )}
    >
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>
      <span>{percentageFormatter.format(value)}</span>
    </span>
  )
}
