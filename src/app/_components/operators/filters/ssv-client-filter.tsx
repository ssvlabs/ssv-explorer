"use client"

import { xor } from "lodash-es"

import { cn, toSentenceCase } from "@/lib/utils"
import { useOperatorNodeClients } from "@/hooks/queries/use-operator-node-clients"
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

export function SsvClientFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()
  const { data: nodeClients, isLoading } = useOperatorNodeClients()

  const clients = nodeClients?.ssvClient || []

  return (
    <FilterButton
      name="SSV Client"
      activeFiltersCount={filters.ssvClient?.length}
      onClear={() => setFilters((prev) => ({ ...prev, ssvClient: null }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>
            {isLoading ? "Loading..." : "This list is empty."}
          </CommandEmpty>
          <CommandGroup>
            {clients.map((client) => (
              <CommandItem
                key={client}
                value={client}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    ssvClient: xor(prev.ssvClient, [client]),
                  }))
                }}
              >
                <Checkbox
                  id={client}
                  checked={filters.ssvClient?.includes(client)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {client}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
