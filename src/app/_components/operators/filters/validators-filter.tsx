"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

export function ValidatorsFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const defaultRange = operatorSearchFilters.validatorsCount.defaultValue

  const isActive = !isEqual(filters.validatorsCount, defaultRange)

  const apply = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      validatorsCount: range,
    }))
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      isActive={isActive}
      name="Validators"
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
      onClear={remove}
    >
      <RangeFilter
        name="Validators"
        searchRange={filters.validatorsCount}
        apply={apply}
        remove={remove}
        step={1}
        defaultRange={defaultRange}
      />
    </FilterButton>
  )
}
