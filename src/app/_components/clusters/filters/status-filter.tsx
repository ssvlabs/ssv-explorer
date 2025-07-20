"use client"

import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

export function StatusFilter() {
  const { filters, setFilters } = useClustersSearchParams()

  return (
    <FilterButton
      name="Status"
      isActive={filters.status !== null}
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
          <RadioGroup>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  status: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.status === null}
                id="all"
                value="all"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                All
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  status: true,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.status === true}
                id="active"
                value="active"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Active
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  status: false,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.status === false}
                id="inactive"
                value="inactive"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Inactive
              </span>
            </CommandItem>
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
