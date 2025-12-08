import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react"
import { isEqual } from "lodash-es"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { useReactiveRef as useRef } from "@/hooks/use-reactive-ref"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { RangeSlider } from "@/components/ui/slider"

import { NumberInput, type NumberInputProps } from "../ui/number-input"

export type RangeProps = {
  name: string
  defaultRange: [number, number]
  searchRange: [number, number] | null
  step?: number
  min?: number
  max?: number
  decimals?: number
  inputs?: Partial<{
    start: Partial<NumberInputProps>
    end: Partial<NumberInputProps>
  }>
  apply: (range: [number, number]) => void
  remove: () => void
}

export const Range: FC<ComponentPropsWithoutRef<"form"> & RangeProps> = ({
  name,
  defaultRange,
  inputs,
  min,
  max,
  step = 0.01,
  decimals = 0,
  searchRange,
  apply,
  remove,
  ...props
}) => {
  const form = useForm<{
    range: [number, number]
  }>({
    defaultValues: {
      range: searchRange ?? defaultRange,
    },
  })

  const range = form.watch("range")

  const isChanged = form.formState.isDirty

  const submit = form.handleSubmit((data) => {
    const shouldEmit = !isEqual(searchRange, data.range)
    if (!shouldEmit) {
      return form.reset({
        range: searchRange ?? defaultRange,
      })
    }
    if (isEqual(data.range, defaultRange)) {
      return remove()
    }
    return apply(data.range)
  })

  useEffect(() => {
    const firstInput = document.getElementById(
      "first-input"
    ) as HTMLInputElement
    firstInput?.focus()
    firstInput?.select()
  }, [])

  useEffect(() => {
    form.reset({
      range: searchRange ?? defaultRange,
    })
  }, [searchRange, defaultRange, form.reset])

  const setRange = (range: [number, number]) => {
    form.setValue("range", range, {
      shouldDirty: true,
    })
  }

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn(props.className)}
        onSubmit={submit}
        onReset={remove}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <NumberInput
              id="first-input"
              min={min || defaultRange[0]}
              max={max || defaultRange[1]}
              decimals={decimals}
              {...inputs?.start}
              step={step}
              className={cn(
                "h-8 max-w-[160px] text-sm",
                inputs?.start?.className
              )}
              type="number"
              value={range[0]}
              onChange={(newStart) => {
                setRange([newStart, range[1]])
              }}
            />
            <NumberInput
              min={min || defaultRange[0]}
              max={max || defaultRange[1]}
              decimals={decimals}
              {...inputs?.end}
              step={step}
              type="number"
              className={cn(
                "h-8 max-w-[160px] text-sm",
                inputs?.end?.className
              )}
              value={range[1]}
              onChange={(newEnd) => setRange([range[0], newEnd])}
            />
          </div>
          <RangeSlider
            className="py-1"
            value={form.watch("range")}
            max={defaultRange[1]}
            step={step}
            onValueChange={(values) => setRange(values as [number, number])}
          />
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
          <Button
            variant="ghost"
            className="w-32 text-sm"
            onClick={() => {
              setRange(defaultRange)
              submit()
            }}
          >
            Remove
          </Button>
          <Button
            type="submit"
            disabled={!isChanged}
            variant="default"
            className="w-32 text-sm"
          >
            Apply
          </Button>
        </div>
      </form>
    </Form>
  )
}
