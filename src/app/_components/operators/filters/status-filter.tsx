"use client"

import { xor } from "lodash-es"

import { toSentenceCase } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

const statuses = ["active", "inactive", "no validators", "invalid"]

export function StatusFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = Boolean(filters.status?.length)

  return (
    <FilterButton
      name="Status"
      activeFiltersCount={filters.status?.length || 0}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          status: null,
        }))
      }
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status}
                value={status}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    status: xor(prev.status, [
                      status as
                        | "active"
                        | "inactive"
                        | "no validators"
                        | "invalid",
                    ]),
                  }))
                }}
              >
                <Checkbox
                  id={status}
                  checked={filters.status?.includes(status)}
                  className="mr-2"
                />
                <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {toSentenceCase(status)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
