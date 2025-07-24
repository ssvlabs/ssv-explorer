"use client"

import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

export function EntityFilter() {
  const { filters, setFilters } = useEventsSearchParams()

  return (
    <FilterButton
      name="Entity"
      className="capitalize"
      isActive={filters.entity !== null}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          entity: null,
        }))
      }
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <RadioGroup>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  entity: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.entity === null}
                id="all"
                value="all"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                All
              </span>
            </CommandItem>

            {(["operator", "cluster", "validator"] as const).map((entity) => (
              <CommandItem
                key={entity}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    entity,
                  }))
                }}
              >
                <RadioGroupItem
                  checked={filters.entity === entity}
                  id={entity}
                  value={entity}
                  className="mr-2"
                />
                <span className="flex-1 text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {entity}
                </span>
              </CommandItem>
            ))}
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
