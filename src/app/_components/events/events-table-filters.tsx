import { useTable } from "@/context/table-context"

import { cn } from "@/lib/utils"
import { type AccountEventName } from "@/lib/utils/account-events"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { EntityFilter } from "@/app/_components/events/filters/entity"
import { EventFilter } from "@/app/_components/events/filters/event"

export type EventsTableFiltersProps = {
  className?: string
  showEntity?: boolean
  showEvent?: boolean
  eventTypes?: readonly AccountEventName[]
}

export const EventsTableFilters = ({
  className,
  showEntity = true,
  showEvent = false,
  eventTypes,
}: EventsTableFiltersProps) => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useEventsSearchParams()

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300",
        isFiltersOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 border-t border-gray-300 py-2 transition-opacity duration-300",
            {
              "opacity-100": isFiltersOpen,
              "opacity-0": !isFiltersOpen,
            }
          )}
          aria-hidden={!isFiltersOpen}
        >
          {showEntity && <EntityFilter />}
          {showEvent && <EventFilter eventTypes={eventTypes} />}
          {enabledFilters.count > 0 && (
            <Button
              variant="ghost"
              name="Clear"
              className={textVariants({
                variant: "body-3-medium",
                className: "text-primary-500",
              })}
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
