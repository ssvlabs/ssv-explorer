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

export function IsLiquidatedFilter() {
  const { filters, setFilters } = useClustersSearchParams()

  return (
    <FilterButton
      name="Liquidated"
      isActive={filters.isLiquidated !== null}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          isLiquidated: null,
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
                  isLiquidated: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isLiquidated === null}
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
                  isLiquidated: true,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isLiquidated === true}
                id="liquidated"
                value="liquidated"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Liquidated
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  isLiquidated: false,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isLiquidated === false}
                id="not-liquidated"
                value="not-liquidated"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Not Liquidated
              </span>
            </CommandItem>
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
