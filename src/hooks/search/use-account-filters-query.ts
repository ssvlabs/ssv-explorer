import { useCallback, useMemo } from "react"
import { isEqual } from "lodash-es"
import { useQueryStates } from "nuqs"

import { accountsSearchFilters } from "@/lib/search-parsers/accounts-search-parsers"

export const useAccountFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(accountsSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        const parser =
          accountsSearchFilters[key as keyof typeof accountsSearchFilters]
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
