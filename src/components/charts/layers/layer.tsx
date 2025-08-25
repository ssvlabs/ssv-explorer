import type { ComponentPropsWithRef, FC } from "react"

import { type OperatorStatisticItem } from "@/types/api/statistics"
import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"
import { Card } from "@/components/ui/card"
import { Progress, type ProgressProps } from "@/components/ui/progress"
import { Text } from "@/components/ui/text"

export type LayerProps = {
  title: string
  items: OperatorStatisticItem[]
  colorScheme?: ProgressProps["colorScheme"]
}

type LayerFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof LayerProps> & LayerProps
>

export const Layer: LayerFC = ({
  className,
  title,
  items,
  colorScheme = "primary",
  ...props
}) => {
  return (
    <Card className={cn(className)} {...props}>
      <Text variant="body-2-bold" className="text-gray-500">
        {title}
      </Text>
      <div className="flex flex-1 flex-col gap-3">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col">
            <div className={cn("flex h-10 items-center justify-between")}>
              <div className="flex items-center gap-2">
                <Text as="span" variant="body-3-medium">
                  {item.name}
                </Text>
              </div>
              <Text as="span" variant="body-3-medium" className="text-gray-500">
                {percentageFormatter.format(item.percentage)}
              </Text>
            </div>
            <Progress value={item.percentage} colorScheme={colorScheme} />
          </div>
        ))}
      </div>
    </Card>
  )
}

Layer.displayName = "Layer"
