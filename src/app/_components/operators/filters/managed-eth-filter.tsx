"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

const defaultRange: [number, number] = [0, 25000]
export function ManagedEthFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.managedEth,
    operatorSearchFilters.managedEth.defaultValue
  )

  return (
    <FilterButton
      isActive={hasSelectedItems}
      name="Managed ETH"
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
      onClear={() =>
        setFilters({
          ...filters,
          managedEth: operatorSearchFilters.managedEth.defaultValue,
        })
      }
    >
      <RangeFilter
        name="Managed ETH"
        searchRange={filters.managedEth}
        inputs={{
          start: { step: 1 },
          end: { step: 1 },
        }}
        apply={(range) =>
          setFilters({
            ...filters,
            managedEth: range,
          })
        }
        remove={() =>
          setFilters({
            ...filters,
            managedEth: operatorSearchFilters.managedEth.defaultValue,
          })
        }
        defaultRange={defaultRange}
      />
    </FilterButton>
  )
}
