"use client"

import { type Column } from "@tanstack/react-table"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"

import { cn } from "@/lib/utils"

import { Text } from "../ui/text"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("whitespace-nowrap text-gray-500", className)}>
        <Text variant="caption-medium">{title}</Text>
      </div>
    )
  }

  const sort = column.getIsSorted()

  return (
    <div
      onClick={() => column.toggleSorting()}
      className={cn(
        "flex h-full cursor-pointer select-none items-center gap-[6px] whitespace-nowrap text-gray-500",
        className
      )}
    >
      <Text variant="caption-medium">{title}</Text>
      <div className="relative size-3">
        <FaSort
          className={cn("absolute inset-0 size-3", {
            "text-gray-300": Boolean(sort),
          })}
        />
        {sort === "asc" && (
          <FaSortUp className="absolute inset-0 size-3 text-primary-500" />
        )}
        {sort === "desc" && (
          <FaSortDown className="absolute inset-0 size-3 text-primary-500" />
        )}
      </div>
    </div>
  )
}
