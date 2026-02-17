"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { Range } from "@/components/filter/range-filter"

export function EthFeeFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const defaultRange = operatorSearchFilters.ethFee.defaultValue

  const isActive =
    !isEqual(filters.ethFee, defaultRange) && Boolean(filters.ethFee)

  const apply = (range: [number, number]) => {
    const isCleared = isEqual(range, defaultRange)
    setFilters((prev) => ({
      ...prev,
      ethFee: isCleared ? null : range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      name="Fee (ETH)"
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
        name="Fee (ETH)"
        searchRange={filters.ethFee}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        step={0.01}
        decimals={2}
        inputs={{
          start: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                ETH
              </Text>
            ),
          },
          end: {
            rightSlot: (
              <Text variant="body-3-medium" className="text-gray-500">
                ETH
              </Text>
            ),
          },
        }}
      />
    </FilterButton>
  )
}
