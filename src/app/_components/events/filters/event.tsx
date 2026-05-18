"use client"

import { operatorHistoryEventTypes } from "@/lib/search-parsers/events-search-parsers"
import { toSentenceCase } from "@/lib/utils"
import { type AccountEventName } from "@/lib/utils/account-events"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterButton } from "@/components/filter/filter-button"

interface EventFilterProps {
  eventTypes?: readonly AccountEventName[]
}

export function EventFilter({
  eventTypes = operatorHistoryEventTypes,
}: EventFilterProps) {
  const { filters, setFilters } = useEventsSearchParams()

  const selectedEvent = filters.event?.[0] ?? null

  return (
    <FilterButton
      name="Event"
      isActive={selectedEvent !== null}
      onClear={() => setFilters((prev) => ({ ...prev, event: [] }))}
      popover={{ content: { className: "w-auto" } }}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <RadioGroup>
            {eventTypes.map((eventType) => (
              <CommandItem
                key={eventType}
                className="flex h-10 items-center space-x-2 whitespace-nowrap px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    event: selectedEvent === eventType ? [] : [eventType],
                  }))
                }}
              >
                <RadioGroupItem
                  checked={selectedEvent === eventType}
                  id={eventType}
                  value={eventType}
                  className="mr-2"
                />
                <span className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {toSentenceCase(eventType)}
                </span>
              </CommandItem>
            ))}
          </RadioGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
