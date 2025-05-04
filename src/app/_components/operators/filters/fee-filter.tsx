"use client"

import { isEqual } from "lodash-es"

import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

const defaultRange = [0, 100] as [number, number]

export function FeeFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const isActive = !isEqual(filters.fee, defaultRange) && Boolean(filters.fee)

  const apply = (range: [number, number]) => {
    const isCleared = isEqual(range, defaultRange)
    setFilters((prev) => ({
      ...prev,
      fee: isCleared ? null : range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      name="Fee"
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
        name="Fee"
        searchRange={filters.fee}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        inputs={{
          start: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                SSV
              </Text>
            ),
          },
          end: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                SSV
              </Text>
            ),
          },
        }}
      />
    </FilterButton>
  )
}
