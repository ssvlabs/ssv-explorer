"use client"

import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

export function IsPrivateFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <FilterButton
      name="Private"
      isActive={filters.isPrivate !== null}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          isPrivate: null,
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
                  isPrivate: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isPrivate === null}
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
                  isPrivate: true,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isPrivate === true}
                id="private"
                value="private"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Private
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  isPrivate: false,
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.isPrivate === false}
                id="public"
                value="public"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Public
              </span>
            </CommandItem>
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
