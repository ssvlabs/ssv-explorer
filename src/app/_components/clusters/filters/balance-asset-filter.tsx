"use client"

import { useClustersSearchParams } from "@/hooks/search/use-custom-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

const options = [
  { label: "All", value: null },
  { label: "ETH", value: "eth" },
  { label: "SSV", value: "ssv" },
] as const

export function BalanceAssetFilter() {
  const { filters, setFilters } = useClustersSearchParams()

  return (
    <FilterButton
      name="Balance Asset"
      isActive={filters.balanceType !== null}
      onClear={() => setFilters((prev) => ({ ...prev, balanceType: null }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <RadioGroup>
            {options.map((option) => (
              <CommandItem
                key={String(option.value)}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() =>
                  setFilters((prev) => ({
                    ...prev,
                    balanceType: option.value,
                  }))
                }
              >
                <RadioGroupItem
                  checked={filters.balanceType === option.value}
                  id={String(option.value)}
                  value={String(option.value)}
                  className="mr-2"
                />
                <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.label}
                </span>
              </CommandItem>
            ))}
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
