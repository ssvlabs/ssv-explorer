import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react"
import { isEqual } from "lodash-es"

import { cn } from "@/lib/utils"
import { useReactiveRef as useRef } from "@/hooks/use-reactive-ref"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"

type RangeFilterProps = {
  name: string
  defaultRange: [number, number]
  searchRange: [number, number] | null
  step?: number
  inputs?: Partial<{
    start: InputProps
    end: InputProps
  }>
  apply: (range: [number, number]) => void
  remove: () => void
}

export const RangeFilter: FC<
  ComponentPropsWithoutRef<"div"> & RangeFilterProps
> = ({
  name,
  defaultRange,
  inputs,
  step = 0.01,
  searchRange,
  apply,
  remove,
  ...props
}) => {
  const [range, setRange] = useState<[number, number]>(
    searchRange ?? defaultRange
  )

  const _range = useRef<[number, number]>(range)
  const _defaultRange = useRef<[number, number]>(defaultRange)

  useEffect(() => {
    if (!isEqual(_range.current, searchRange))
      setRange(searchRange || _defaultRange.current)
  }, [searchRange])

  const isChanged =
    !isEqual(range, searchRange) && !isEqual(range, defaultRange)

  const emit = (clear?: boolean) => {
    if (isEqual(range, defaultRange) || clear) {
      return remove()
    }
    return apply(range)
  }

  return (
    <div {...props} className={cn(props.className)}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Input
            min={0}
            {...inputs?.start}
            step={step}
            className={cn(
              "h-8 max-w-[160px] text-sm",
              inputs?.start?.className
            )}
            type="number"
            value={range[0]}
            onChange={(e) => {
              const newStart = +e.target.value
              setRange([newStart, range[1]])
            }}
          />
          <Input
            min={0}
            {...inputs?.end}
            step={step}
            type="number"
            className={cn("h-8 max-w-[160px] text-sm", inputs?.end?.className)}
            value={range[1]}
            onChange={(e) => {
              const newEnd = +e.target.value
              setRange([range[0], newEnd])
            }}
          />
        </div>
        <RangeSlider
          className="py-1"
          value={range}
          max={defaultRange[1]}
          step={step}
          onValueChange={(values) => setRange(values as [number, number])}
        />
      </div>
      <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
        <Button
          variant="ghost"
          className="w-32 text-sm"
          onClick={() => emit(true)}
        >
          Remove
        </Button>
        <Button
          disabled={!isChanged}
          variant="default"
          className="w-32 text-sm"
          onClick={() => emit()}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
