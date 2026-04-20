"use client"

import { xor } from "lodash-es"

import { operatorHistoryEventTypes } from "@/lib/search-parsers/events-search-parsers"
import { toSentenceCase } from "@/lib/utils"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function EventFilter() {
  const { filters, setFilters } = useEventsSearchParams()

  return (
    <FilterButton
      name="Event"
      activeFiltersCount={filters.event?.length}
      onClear={() => setFilters((prev) => ({ ...prev, event: null }))}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {operatorHistoryEventTypes.map((eventType) => (
              <CommandItem
                key={eventType}
                value={eventType}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    event: xor(prev.event, [eventType]),
                  }))
                }}
              >
                <Checkbox
                  id={eventType}
                  checked={filters.event?.includes(eventType)}
                  className="mr-2"
                />
                <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {toSentenceCase(eventType)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
