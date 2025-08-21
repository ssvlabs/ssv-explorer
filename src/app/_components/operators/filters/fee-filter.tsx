"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { Range } from "@/components/filter/range-filter"

export function FeeFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const defaultRange = operatorSearchFilters.fee.defaultValue

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
      <Range
        className="w-[400px] max-w-full"
        name="Fee"
        searchRange={filters.fee}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        step={0.1}
        decimals={2}
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
