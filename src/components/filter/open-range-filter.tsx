import { useEffect, type ComponentPropsWithoutRef, type FC } from "react"
import { isEqual } from "lodash-es"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { NumberInput, type NumberInputProps } from "../ui/number-input"

export type OpenRangeProps = {
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

export const OpenRange: FC<
  ComponentPropsWithoutRef<"form"> & OpenRangeProps
> = ({
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
    let range: [number, number] = data.range
    const hasValues = range[1] !== 0 && range[0] !== 0
    // Swap values if min > max
    if (hasValues && range[0] > range[1]) {
      range = [range[1], range[0]]
    }

    const shouldEmit = !isEqual(searchRange, range)
    if (!shouldEmit) {
      return form.reset({
        range: searchRange ?? defaultRange,
      })
    }
    if (isEqual(range, defaultRange)) {
      return remove()
    }
    return apply(range)
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
              decimals={decimals}
              {...inputs?.start}
              step={step}
              className={cn(
                "h-8 max-w-[160px] text-sm",
                inputs?.start?.className
              )}
              type="number"
              value={range[0]}
              clearZeroOnMount
              onChange={(newStart) => {
                setRange([newStart, range[1]])
              }}
            />
            <NumberInput
              decimals={decimals}
              {...inputs?.end}
              step={step}
              type="number"
              className={cn(
                "h-8 max-w-[160px] text-sm",
                inputs?.end?.className
              )}
              value={range[1]}
              clearZeroOnMount
              onChange={(newEnd) => setRange([range[0], newEnd])}
            />
          </div>
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
