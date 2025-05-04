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

export function VerifiedFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <FilterButton
      name="Verified"
      isActive={filters.type !== null}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          type: null,
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
                  type: null,
                }))
              }}
            >
              <RadioGroupItem
                checked={!filters.type}
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
                  type: "verified_operator",
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.type === "verified_operator"}
                id="verified"
                value="verified"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Verified
              </span>
            </CommandItem>
            <CommandItem
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  type: "operator",
                }))
              }}
            >
              <RadioGroupItem
                checked={filters.type === "operator"}
                id="unverified"
                value="unverified"
                className="mr-2"
              />
              <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Unverified
              </span>
            </CommandItem>
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
