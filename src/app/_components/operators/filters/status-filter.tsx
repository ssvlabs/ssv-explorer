"use client"

import { xor } from "lodash-es"

import { cn } from "@/lib/utils"
import {
  STATUS_API_TO_UI,
  STATUS_DISPLAY_VALUES,
  STATUS_UI_TO_API,
} from "@/lib/utils/operator"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function StatusFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  // Convert API values back to UI values for display
  const displayStatuses =
    filters.status?.map((apiStatus) => STATUS_API_TO_UI[apiStatus]) || []

  return (
    <FilterButton
      name="Status"
      activeFiltersCount={filters.status?.length}
      onClear={() => setFilters((prev) => ({ ...prev, status: null }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {STATUS_DISPLAY_VALUES.map((displayStatus) => {
              const apiStatus = STATUS_UI_TO_API[displayStatus]
              return (
                <CommandItem
                  key={displayStatus}
                  value={displayStatus}
                  className="flex h-10 items-center space-x-2 px-2"
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      status: xor(prev.status, [apiStatus]),
                    }))
                  }}
                >
                  <Checkbox
                    id={displayStatus}
                    checked={displayStatuses.includes(displayStatus)}
                    className="mr-2"
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                  >
                    {displayStatus}
                  </span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
