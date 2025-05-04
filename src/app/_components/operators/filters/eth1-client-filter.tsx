"use client"

import { xor } from "lodash-es"

import { cn, toSentenceCase } from "@/lib/utils"
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

const clients = ["geth", "nethermind", "besu", "erigon"]

export function Eth1ClientFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  return (
    <FilterButton
      name="ETH1 Client"
      activeFiltersCount={filters.eth1?.length}
      onClear={() => setFilters((prev) => ({ ...prev, eth1: [] }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {clients.map((client) => (
              <CommandItem
                key={client}
                value={client}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    eth1: xor(prev.eth1, [client]),
                  }))
                }}
              >
                <Checkbox
                  id={client}
                  checked={filters.eth1?.includes(client)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {toSentenceCase(client)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
