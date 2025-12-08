"use client"

import type { ComponentPropsWithRef, FC } from "react"

import type { OperatorStatisticItem } from "@/types/api/statistics"
import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"
import { Text } from "@/components/ui/text"
import { getCountryColor } from "@/components/charts/worldmap/colors"

export type GeoLegendItemProps = {
  item: OperatorStatisticItem
}

type GeoLegendItemFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof GeoLegendItemProps> &
    GeoLegendItemProps
>

export const GeoLegendItem: GeoLegendItemFC = ({
  className,
  item,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            background: getCountryColor(item.count),
            height: "12px",
            aspectRatio: "1/cos(30deg)",
            clipPath: "polygon(50% -50%,100% 50%,50% 150%,0 50%)",
          }}
        ></div>
        <Text as="span" variant="body-3-medium">
          {item.name}
        </Text>
      </div>
      <Text as="span" variant="body-3-medium" className="text-gray-500">
        {percentageFormatter.format(item.percentage)}
      </Text>
    </div>
  )
}

GeoLegendItem.displayName = "GeoLegendItem"
