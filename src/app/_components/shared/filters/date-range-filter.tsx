"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { isEqual } from "lodash-es"
import { useQueryState, type ParserBuilder } from "nuqs"

import {
  DateRangeSelector,
  type DateRange,
} from "@/components/date-range-picker"
import { FilterButton } from "@/components/filter/filter-button"

type Props<TSearchKey extends string = string> = {
  name: string
  searchQueryKey: TSearchKey
  parser: ParserBuilder<[number, number]>
}
export const DateRangeFilter = <TSearchKey extends string = string>({
  name,
  searchQueryKey,
  parser,
}: Props<TSearchKey>) => {
  const [searchRange, setSearchRange] = useQueryState(searchQueryKey, parser)
  const [range, setRange] = useState<DateRange>({
    from: searchRange?.[0] ? new Date(searchRange?.[0]) : new Date(),
    to: searchRange?.[1] ? new Date(searchRange?.[1]) : new Date(),
  })

  const syncRange = useCallback(() => {
    setRange({
      from: searchRange?.[0] ? new Date(searchRange?.[0]) : new Date(),
      to: searchRange?.[1] ? new Date(searchRange?.[1]) : new Date(),
    })
  }, [searchRange])

  useEffect(() => {
    syncRange()
  }, [searchRange])

  const isActive = Boolean(searchRange)
  const isChanged = useMemo(() => {
    if (!searchRange) return true
    if (
      searchRange[0] === range.from.getTime() &&
      searchRange[1] === (range.to?.getTime() ?? 0)
    )
      return false
    return true
  }, [searchRange, range])

  const apply = (range: [number, number] | null) => {
    setSearchRange(range)
  }

  const remove = () => {
    setSearchRange(null)
    setRange({
      from: new Date(),
      to: new Date(),
    })
  }

  return (
    <FilterButton
      name={name}
      isActive={isActive}
      onClear={remove}
      popover={{
        content: {
          className: "w-fit px-2",
        },
      }}
    >
      <DateRangeSelector
        range={range}
        onRangeChange={(range) => {
          setRange(range)
        }}
        onUpdate={() => {
          apply([range.from.getTime(), range.to?.getTime() ?? 0])
        }}
        onCancel={() => {
          remove()
        }}
        canUpdate={isChanged}
      />
    </FilterButton>
  )
}
