"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { Range } from "@/components/filter/range-filter"

export function ManagedEthFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const defaultRange = operatorSearchFilters.effectiveBalance.defaultValue

  const isActive =
    !isEqual(filters.effectiveBalance, defaultRange) &&
    Boolean(filters.effectiveBalance)

  const apply = (range: [number, number]) => {
    const isCleared = isEqual(range, defaultRange)
    setFilters((prev) => ({
      ...prev,
      effectiveBalance: isCleared ? null : range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      isActive={isActive}
      name={`ETH Managed`}
      onClear={remove}
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
    >
      <Range
        className="w-[400px] max-w-full"
        name={`ETH Managed`}
        searchRange={filters.effectiveBalance}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        step={1}
        decimals={0}
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
