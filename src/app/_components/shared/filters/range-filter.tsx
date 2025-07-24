"use client"

import { isEqual } from "lodash-es"
import { useQueryState, type ParserBuilder } from "nuqs"

import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { Range, type RangeProps } from "@/components/filter/range-filter"

type Props<TSearchKey extends string = string> = {
  name: string
  searchQueryKey: TSearchKey
  parser: ParserBuilder<[number, number]> & { defaultValue: [number, number] }
  inputs?: RangeProps["inputs"]
  suffix?: string
  step?: number
  decimals?: number
}
export const RangeFilter = <TSearchKey extends string = string>({
  name,
  searchQueryKey,
  parser,
  inputs,
  suffix,
  step = 0.1,
  decimals = 1,
}: Props<TSearchKey>) => {
  const [searchRange, setSearchRange] = useQueryState(searchQueryKey, parser)
  const defaultRange = parser.defaultValue

  const isActive = !isEqual(searchRange, defaultRange) && Boolean(searchRange)

  const apply = (range: [number, number]) => {
    const isCleared = isEqual(range, defaultRange)
    setSearchRange(isCleared ? null : range)
  }

  const remove = () => {
    apply(defaultRange)
  }

  return (
    <FilterButton
      name={name}
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
        searchRange={searchRange}
        defaultRange={defaultRange}
        apply={apply}
        remove={remove}
        step={step}
        decimals={decimals}
        inputs={
          inputs || {
            start: {
              rightSlot: (
                <Text variant="body-3-medium" className="text-gray-500">
                  {suffix ?? "SSV"}
                </Text>
              ),
            },
            end: {
              rightSlot: (
                <Text variant="body-3-medium" className="text-gray-500">
                  {suffix ?? "SSV"}
                </Text>
              ),
            },
          }
        }
      />
    </FilterButton>
  )
}
