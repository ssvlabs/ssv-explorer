"use client"

import { xor } from "lodash-es"

import { cn, toSentenceCase } from "@/lib/utils"
import { MEV_RELAYS_VALUES } from "@/lib/utils/operator"
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
import { MevRelayLogo } from "@/components/mev-relay-logo"

export function MevRelaysFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <FilterButton
      name="MEV Relay"
      activeFiltersCount={filters.mev?.length}
      onClear={() => setFilters((prev) => ({ ...prev, mev: null }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {MEV_RELAYS_VALUES.map((mev) => (
              <CommandItem
                key={mev}
                value={mev}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    mev: xor(prev.mev, [mev]),
                  }))
                }}
              >
                <Checkbox
                  id={mev}
                  checked={filters.mev?.includes(mev)}
                  className="mr-2"
                />
                <MevRelayLogo
                  mev={mev}
                  className="text-2xl"
                  variant="unstyled"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {toSentenceCase(mev)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
