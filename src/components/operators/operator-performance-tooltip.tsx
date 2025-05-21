import type { FC, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Text, textVariants } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"

const statusItems = [
  {
    label: "Great",
    color: "text-[#06B64F]",
  },
  {
    label: "Good",
    color: "text-[#7ED90B]",
  },
  {
    label: "Moderate",
    color: "text-[#FD9D2F]",
  },
  {
    label: "Low",
    color: "text-[#EC1C26]",
  },
]

export const OperatorPerformanceTooltip: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Tooltip
      asChild
      content={
        <div className="flex flex-col gap-8 p-8">
          <div>
            <Text variant="body-2-medium">
              The operator’s performance score is determined by the percentage
              of fulfilled duties within the specified time frame.
            </Text>

            <Button
              as="a"
              variant="link"
              href="/"
              className={textVariants({ variant: "body-2-medium" })}
            >
              Learn more about the operator’s performance score.
            </Button>
          </div>
          <div className="flex items-center gap-6">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className={`font-body-body-3-semibold flex items-center gap-1 text-sm font-semibold ${item.color}`}
              >
                <span>■</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      }
      className="p-0"
    >
      {children}
    </Tooltip>
  )
}

OperatorPerformanceTooltip.displayName = "OperatorPerformanceTooltip"
