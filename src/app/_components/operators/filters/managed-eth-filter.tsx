"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { FilterButton } from "@/components/filter/filter-button"
import { Range } from "@/components/filter/range-filter"

const defaultRange: [number, number] = [0, 25000]
export function ManagedEthFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.managedEth,
    operatorSearchFilters.managedEth.defaultValue
  )

  const nativeCurrency = useNativeCurrency()

  return (
    <FilterButton
      isActive={hasSelectedItems}
      name={`Managed ${nativeCurrency.symbol}`}
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
      <Range
        name={`Managed ${nativeCurrency.symbol}`}
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
