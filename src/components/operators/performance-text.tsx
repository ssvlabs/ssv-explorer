import { type ComponentPropsWithRef, type FC } from "react"

import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"

type PerformanceTextProps = {
  performance: number | undefined
}

const getColor = (performance: number) => {
  if (performance > 99) return "text-[#06B64F]"
  if (performance > 96) return "text-[#7ED90B]"
  if (performance > 90) return "text-[#FD9D2F]"
  if (performance > 0) return "text-[#EC1C26]"
  if (performance === 0) return "text-gray-500"
}

export const PerformanceText: FC<
  PerformanceTextProps & ComponentPropsWithRef<"span">
> = ({ performance, className, ...props }) => {
  if (performance === undefined || performance === null) {
    return (
      <span className={cn("text-gray-500", className)} {...props}>
        n/a
      </span>
    )
  }

  return (
    <span className={cn(getColor(performance), className)} {...props}>
      {percentageFormatter.format(performance)}
    </span>
  )
}
