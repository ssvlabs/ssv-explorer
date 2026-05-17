"use client"

import { isEqual } from "lodash-es"
import { SingleParserBuilder, useQueryState } from "nuqs"

import { useDisclosure } from "@/hooks/use-disclosure"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import {
  OpenRange,
  type OpenRangeProps,
} from "@/components/filter/open-range-filter"

type Props<TSearchKey extends string = string> = {
  name: string
  searchQueryKey: TSearchKey
  parser: SingleParserBuilder<[number, number]> & {
    defaultValue?: [number, number]
  }
  inputs?: OpenRangeProps["inputs"]
}

export function OpenRangeFilter<TSearchKey extends string = string>({
  name,
  searchQueryKey,
  parser,
  inputs,
}: Props<TSearchKey>) {
  const popup = useDisclosure()

  const [searchRange, setSearchRange] = useQueryState(searchQueryKey, parser)
  const defaultRange = parser.defaultValue ?? [0, 0]

  const isActive = !isEqual(searchRange, defaultRange) && Boolean(searchRange)

  const apply = (range: [number, number]) => {
    const isCleared = isEqual(range, defaultRange)
    setSearchRange(isCleared ? null : range)
    popup.onOpenChange(false)
  }

  const remove = () => {
    apply(defaultRange)
    popup.onOpenChange(false)
  }

  return (
    <FilterButton
      isActive={isActive}
      name={name}
      onClear={remove}
      popover={{
        root: popup,
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
    >
      <OpenRange
        className="w-[400px] max-w-full"
        name={name}
        searchRange={searchRange}
        defaultRange={defaultRange}
        min={0}
        apply={apply}
        remove={remove}
        step={1}
        decimals={0}
        inputs={inputs}
      />
    </FilterButton>
  )
}

const ethInputs: OpenRangeProps["inputs"] = {
  start: {
    placeholder: "From",
    rightSlot: (
      <Text variant="body-3-medium" className="text-gray-500">
        ETH
      </Text>
    ),
  },
  end: {
    placeholder: "To",
    rightSlot: (
      <Text variant="body-3-medium" className="text-gray-500">
        ETH
      </Text>
    ),
  },
}

export function EffectiveBalanceFilter<TSearchKey extends string = string>(
  props: Omit<Props<TSearchKey>, "inputs">
) {
  return <OpenRangeFilter {...props} inputs={ethInputs} />
}
