import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { cn } from "@/lib/utils"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { EntityFilter } from "@/app/_components/events/filters/entity"
import { EventFilter } from "@/app/_components/events/filters/event"

export type EventsTableFiltersProps = {
  className?: string
  showEntity?: boolean
  showEvent?: boolean
}

export const EventsTableFilters = ({
  className,
  showEntity = true,
  showEvent = false,
}: EventsTableFiltersProps) => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useEventsSearchParams()

  return (
    <Collapse
      isOpened={isFiltersOpen}
      theme={{
        collapse: cn("ReactCollapse--collapse", className),
      }}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 overflow-hidden border-t border-gray-300 py-2 transition-opacity duration-300",
          {
            "opacity-100": isFiltersOpen,
            "invisible opacity-0": !isFiltersOpen,
          }
        )}
        aria-hidden={!isFiltersOpen}
      >
        {showEntity && <EntityFilter />}
        {showEvent && <EventFilter />}
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
    </Collapse>
  )
}
