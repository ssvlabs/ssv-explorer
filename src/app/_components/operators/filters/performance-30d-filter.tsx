"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

export function Performance30dFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()
  const defaultRange = operatorSearchFilters.performance30d.defaultValue

  const isActive = !isEqual(filters.performance30d, defaultRange)

  const apply = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      performance30d: range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      name="Performance 30d"
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
        name="Performance 30d"
        searchRange={filters.performance30d}
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
