"use client"

import { useTable } from "@/context/table-context"
import { Settings2 } from "lucide-react"

import { TableMenuButton } from "@/components/ui/table"

import { Text } from "../ui/text"

interface DataTableFiltersButtonProps {
  enabledFilters: {
    count: number
    names: string[]
  }
}

export function DataTableMenuButton({
  enabledFilters,
}: DataTableFiltersButtonProps) {
  const { isFiltersOpen, setIsFiltersOpen } = useTable()
  return (
    <TableMenuButton
      aria-label="Toggle columns"
      role="combobox"
      onClick={() => setIsFiltersOpen((prev) => !prev)}
      activeCount={enabledFilters.count}
      isActive={isFiltersOpen}
      icon={<Settings2 />}
    >
      <Text className="hidden sm:inline">Filters</Text>
    </TableMenuButton>
  )
}
