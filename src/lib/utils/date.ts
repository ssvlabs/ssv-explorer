import type { FormatDurationOptions } from "date-fns"
import {
  format,
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
} from "date-fns"

import { ms, numberFormatter } from "@/lib/utils/number"

const daysFormat = ["days", "hours"] satisfies FormatDurationOptions["format"]
const hoursFormat = [
  "hours",
  "minutes",
] satisfies FormatDurationOptions["format"]
const minutesFormat = [
  "minutes",
  "seconds",
] satisfies FormatDurationOptions["format"]

export const humanizeDuration = (duration: number) =>
  formatDuration(
    intervalToDuration({
      start: 0,
      end: duration,
    }),
    {
      format:
        duration > ms("1d")
          ? daysFormat
          : duration > ms("1h")
            ? hoursFormat
            : minutesFormat,
    }
  )

export const humanizeFundingDuration = (days: number) => {
  return `${numberFormatter.format(days)} day${days > 1 || days === 0 ? "s" : ""}`
}

export function getRelativeTime(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true }).replace(
    "about ",
    ""
  )
}

export function formatFullDate(date: Date | string) {
  return format(new Date(date), "PPpp")
}
