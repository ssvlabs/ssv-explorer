"use client"

import type { ComponentPropsWithRef, FC } from "react"

import type { OperatorStatisticItem } from "@/types/api/statistics"
import { cn } from "@/lib/utils"

import { GeoLegendItem } from "./geo-legend-item"

export type GeoLegendProps = {
  items: OperatorStatisticItem[]
  totalCount: number
}

type GeoLegendFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof GeoLegendProps> & GeoLegendProps
>

export const GeoLegend: GeoLegendFC = ({
  className,
  items,
  totalCount,
  ...props
}) => {
  const topItems = items.slice(0, 6)
  const topItemsCount = topItems.reduce((sum, item) => sum + item.count, 0)

  const remainingItems = items.slice(6)
  const othersCount = remainingItems.reduce((sum, item) => sum + item.count, 0)
  const displayItems = [...topItems]

  displayItems.push({
    name: "Others",
    count: othersCount,
    percentage: 100 - (topItemsCount / totalCount) * 100,
  })

  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-3 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-100 [&>*:not(:last-child)]:pb-3",
        className
      )}
      {...props}
    >
      {displayItems.map((item) => (
        <GeoLegendItem key={item.name} item={item} />
      ))}
    </div>
  )
}

GeoLegend.displayName = "GeoLegend"
