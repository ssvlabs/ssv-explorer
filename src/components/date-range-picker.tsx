"use client"

import React, { useEffect, useState, type FC } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { textVariants } from "@/components/ui/text"

export interface DateRange {
  from: Date
  to: Date | undefined
}

interface Preset {
  name: string
  label: string
}

// Define presets
const PRESETS: Preset[] = [
  { name: "custom", label: "Custom" },
  { name: "today", label: "Today" },
  { name: "7days", label: "7 Days" },
  { name: "month", label: "Month" },
  { name: "3months", label: "3 Months" },
  { name: "6months", label: "6 Months" },
  { name: "yearToDate", label: "Year to Date" },
  { name: "year", label: "Year" },
]

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-").map((part) => parseInt(part, 10))
    const date = new Date(parts[0] ?? 0, (parts[1] ?? 1) - 1, parts[2] ?? 1)
    return date
  } else {
    return dateInput
  }
}

const getPresetRange = (presetName: string): DateRange | null => {
  const preset = PRESETS.find(({ name }) => name === presetName)
  if (!preset) throw new Error(`Unknown date range preset: ${presetName}`)

  // Custom doesn't have a predefined range
  if (preset.name === "custom") return null

  const from = new Date()
  const to = new Date()

  switch (preset.name) {
    case "today":
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "7days":
      from.setDate(from.getDate() - 6)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "month":
      from.setDate(from.getDate() - 29)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "3months":
      from.setMonth(from.getMonth() - 3)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "6months":
      from.setMonth(from.getMonth() - 6)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "yearToDate":
      from.setMonth(0)
      from.setDate(1)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
    case "year":
      from.setFullYear(from.getFullYear() - 1)
      from.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)
      break
  }

  return { from, to }
}

// ============================================================================
// DateRangeSelector - Standalone component (presets + calendar + buttons)
// ============================================================================

export interface DateRangeSelectorProps {
  /** The current date range */
  range: DateRange
  /** Callback when range changes */
  onRangeChange: (range: DateRange) => void
  /** Callback when update is clicked */
  onUpdate?: () => void
  /** Callback when cancel is clicked */
  onCancel?: () => void
  /** Show action buttons (Cancel/Update) */
  showActions?: boolean
  /** Custom class name */
  className?: string

  canUpdate?: boolean
}

export const DateRangeSelector: FC<DateRangeSelectorProps> = ({
  range,
  onRangeChange,
  onUpdate,
  onCancel,
  showActions = true,
  className,
  canUpdate = true,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  )

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  )

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const setPreset = (preset: string): void => {
    const newRange = getPresetRange(preset)
    // "custom" returns null - don't change range, just mark as custom
    if (newRange) {
      onRangeChange(newRange)
    }
    setSelectedPreset(preset)
  }

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      // Skip "custom" - it's not a preset with a specific range
      if (preset.name === "custom") continue

      const presetRange = getPresetRange(preset.name)
      if (!presetRange) continue

      const normalizedRangeFrom = new Date(range.from)
      normalizedRangeFrom.setHours(0, 0, 0, 0)
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0)
      )

      const normalizedRangeTo = new Date(range.to ?? 0)
      normalizedRangeTo.setHours(0, 0, 0, 0)
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      )

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name)
        return
      }
    }

    // No preset matched, mark as custom
    setSelectedPreset("custom")
  }

   
  useEffect(() => {
    checkPreset()
  }, [range])

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string
    label: string
    isSelected: boolean
  }) => (
    <Button
      className={textVariants({
        variant: "body-3-medium",
        className: "justify-start text-left",
      })}
      variant={isSelected ? "secondary" : "ghost"}
      onClick={() => {
        setPreset(preset)
      }}
    >
      {label}
    </Button>
  )

  return (
    <div className={className}>
      <div className="flex py-2">
        {/* Presets on the left */}
        {!isSmallScreen && (
          <div className="flex flex-col gap-1 border-r pr-2">
            {PRESETS.map((preset) => (
              <PresetButton
                key={preset.name}
                preset={preset.name}
                label={preset.label}
                isSelected={selectedPreset === preset.name}
              />
            ))}
          </div>
        )}
        {/* Calendar section */}
        <div className="flex flex-col">
          {isSmallScreen && (
            <Select
              defaultValue={selectedPreset}
              onValueChange={(value) => {
                setPreset(value)
              }}
            >
              <SelectTrigger className="mx-auto mb-2 w-[180px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div>
            <Calendar
              mode="range"
              onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                if (value?.from != null) {
                  onRangeChange({ from: value.from, to: value?.to })
                }
              }}
              selected={range}
              numberOfMonths={isSmallScreen ? 1 : 2}
              defaultMonth={
                new Date(
                  new Date().setMonth(
                    new Date().getMonth() - (isSmallScreen ? 0 : 1)
                  )
                )
              }
            />
          </div>
        </div>
      </div>
      {showActions && (
        <div className="flex justify-end gap-2 border-t py-2 pr-4">
          <Button onClick={onCancel} variant="ghost" className="w-32 text-sm">
            Remove
          </Button>
          <Button
            disabled={!canUpdate}
            onClick={onUpdate}
            variant="default"
            className="w-32 text-sm"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}

DateRangeSelector.displayName = "DateRangeSelector"

// ============================================================================
// DateRangePicker - Popover wrapper around DateRangeSelector
// ============================================================================

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange }) => void
  /** Initial value for start date */
  initialDateFrom?: Date | string
  /** Initial value for end date */
  initialDateTo?: Date | string
  /** Alignment of popover */
  align?: "start" | "center" | "end"
  /** Option for locale */
  locale?: string
}

export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  onUpdate,
  align = "end",
  locale = "en-US",
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const getInitialRange = (): DateRange => ({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom),
  })

  const [range, setRange] = useState<DateRange>(getInitialRange)
  const [tempRange, setTempRange] = useState<DateRange>(range)

  // Sync tempRange when popover opens
   
  useEffect(() => {
    if (isOpen) {
      setTempRange(range)
    }
  }, [isOpen])

  const handleUpdate = () => {
    setRange(tempRange)
    setIsOpen(false)
    onUpdate?.({ range: tempRange })
  }

  const handleCancel = () => {
    setTempRange(range)
    setIsOpen(false)
  }

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setTempRange(range)
        }
        setIsOpen(open)
      }}
    >
      <PopoverTrigger asChild>
        <Button size={"lg"} variant="outline">
          <div className="text-right">
            <div className="py-1">
              <div>{`${formatDate(range.from, locale)}${
                range.to != null ? " - " + formatDate(range.to, locale) : ""
              }`}</div>
            </div>
          </div>
          <div className="-mr-2 scale-125 pl-1 opacity-60">
            {isOpen ? (
              <ChevronUpIcon width={24} />
            ) : (
              <ChevronDownIcon width={24} />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-0">
        <DateRangeSelector
          range={tempRange}
          onRangeChange={setTempRange}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = "DateRangePicker"
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx"
