"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { FiSidebar } from "react-icons/fi"

import { cn, toSentenceCase } from "@/lib/utils"
import { useColumnsVisibility } from "@/hooks/table/use-columns-visibility"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TableMenuButton } from "@/components/ui/table"
import {
  getColumnTitle,
  type TableName,
} from "@/app/_components/utils/column-titles"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  tableName?: TableName
}

export function DataTableViewOptions<TData>({
  table,
  tableName,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const { visibleColumnsCount } = useColumnsVisibility()

  const columns = table.getAllColumns().filter((column) => {
    return typeof column.accessorFn !== "undefined" && column.getCanHide()
  })

  const resetColumns = () => {
    if (!table.options.meta || !("defaultColumns" in table.options.meta)) {
      return columns.forEach((column) => column.toggleVisibility(true))
    }

    const defaultColumns = table.options.meta.defaultColumns as Record<
      string,
      boolean
    >

    columns.forEach((column) => {
      if (defaultColumns[column.id]) {
        column.toggleVisibility(true)
      } else {
        column.toggleVisibility(false)
      }
    })
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <TableMenuButton
          ref={triggerRef}
          aria-label="Toggle columns"
          role="combobox"
          isActive={open}
          icon={<FiSidebar />}
        >
          <span className="hidden md:block">Customize Table</span>
        </TableMenuButton>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-full overflow-auto p-0 md:w-[400px]"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-medium">Select Columns</p>
            <Button
              variant="ghost"
              className="hover:text-primary h-auto px-2 py-1 text-xs text-muted-foreground"
              onClick={resetColumns}
            >
              Reset
            </Button>
          </div>
          <CommandList className="max-h-none overflow-y-auto">
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => {
                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                    disabled={
                      visibleColumnsCount === 1 && column.getIsVisible()
                    }
                    className="flex h-10 items-center space-x-2 px-2"
                  >
                    <Checkbox
                      id={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => {
                        column.toggleVisibility(!!checked)
                      }}
                      disabled={
                        visibleColumnsCount === 1 && column.getIsVisible()
                      }
                      className="mr-2"
                    />
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        column.getIsVisible()
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {(tableName && getColumnTitle(tableName, column.id)) ||
                        toSentenceCase(column.id)}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
