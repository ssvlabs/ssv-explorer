"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

export function Performance24hFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()
  const defaultRange = operatorSearchFilters.performance24h.defaultValue

  const isActive = !isEqual(filters.performance24h, defaultRange)

  const apply = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      performance24h: range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      name="Performance 24h"
      isActive={isActive}
      onClear={remove}
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
    >
      <RangeFilter
        className="w-[400px] max-w-full"
        name="Performance 24h"
        searchRange={filters.performance24h}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        inputs={{
          start: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                %
              </Text>
            ),
          },
          end: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                %
              </Text>
            ),
          },
        }}
      />
    </FilterButton>
  )
}
