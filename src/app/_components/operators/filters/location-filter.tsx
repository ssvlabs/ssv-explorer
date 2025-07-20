"use client"

import { useState } from "react"
import { getOperatorLocations } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function LocationFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { network, filters, setFilters } = useOperatorsSearchParams()
  const query = useQuery({
    queryKey: ["operators", "locations", network],
    queryFn: async () => getOperatorLocations(network),
    enabled: open,
  })

  return (
    <FilterButton
      name="Location"
      activeFiltersCount={filters.location?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, location: null }))}
      popover={{
        root: {
          open,
          onOpenChange: setOpen,
        },
      }}
    >
      <Command>
        <div className="p-2 pb-0">
          <CommandInput
            placeholder="Search locations"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>
        <CommandList className="max-h-[300px] overflow-y-auto">
          {query.isPending ? (
            <CommandLoading className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          ) : (
            <CommandEmpty>This list is empty.</CommandEmpty>
          )}
          <CommandGroup>
            {query.data?.map((location) => (
              <CommandItem
                key={location["alpha-2"]}
                value={location.name}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    location: xor(prev.location, [location["alpha-2"]]),
                  }))
                }}
              >
                <Checkbox
                  id={location["alpha-2"]}
                  checked={filters.location?.includes(location["alpha-2"])}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {location.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
