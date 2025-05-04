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
      {/* <Select
        value={
          column.getIsSorted() === "desc"
            ? descValue
            : column.getIsSorted() === "asc"
              ? ascValue
              : undefined
        }
        onValueChange={(value) => {
          if (value === ascValue) column.toggleSorting(false)
          else if (value === descValue) column.toggleSorting(true)
          else if (value === hideValue) column.toggleVisibility(false)
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === "desc"
              ? "Sorted descending. Click to sort ascending."
              : column.getIsSorted() === "asc"
                ? "Sorted ascending. Click to sort descending."
                : "Not sorted. Click to sort ascending."
          }
          className="-ml-3 h-8 w-fit border-none text-xs hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent [&>svg:last-child]:hidden"
        >
          {title}
          <SelectIcon asChild>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2.5 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2.5 size-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-2.5 size-4" aria-hidden="true" />
            )}
          </SelectIcon>
        </SelectTrigger>
      </Select> */}
    </div>
  )
}
