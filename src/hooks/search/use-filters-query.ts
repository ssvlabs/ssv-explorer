/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react"
import { isEqual } from "lodash-es"
import { useQueryStates, type ParserBuilder } from "nuqs"

export const useFiltersQuery = <T extends Record<string, ParserBuilder<any>>>(
  searchFilters: T
) => {
  const [filters, setFilters] = useQueryStates(searchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        const parser = searchFilters[key as keyof T]!
        const defaultValue =
          "defaultValue" in parser ? parser.defaultValue : null

        if (!isEqual(value, defaultValue)) {
          acc.count++
          acc.names.push(key)
        }
        return acc
      },
      { count: 0, names: [] as string[] }
    )
    return enabled
  }, [filters, searchFilters])

  const clearFilters = useCallback(() => {
    setFilters(
      (prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key]) => [key, null])
        ) as typeof prev
    )
  }, [setFilters])

  return { filters, setFilters, enabledFilters, clearFilters }
}
