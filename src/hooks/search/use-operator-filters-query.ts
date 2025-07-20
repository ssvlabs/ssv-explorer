import { useCallback, useMemo } from "react"
import { isEqual } from "lodash-es"
import { useQueryStates } from "nuqs"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"

export const useOperatorFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(operatorSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        const parser =
          operatorSearchFilters[key as keyof typeof operatorSearchFilters]
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
  }, [filters])

  const clearFilters = useCallback(() => {
    setFilters((prev) =>
      Object.fromEntries(Object.entries(prev).map(([key]) => [key, null]))
    )
  }, [setFilters])

  return { filters, setFilters, enabledFilters, clearFilters }
}
