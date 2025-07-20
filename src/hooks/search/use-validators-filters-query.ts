import { useCallback, useMemo } from "react"
import { isEqual } from "lodash-es"
import { useQueryStates } from "nuqs"

import { validatorsSearchFilters } from "@/lib/search-parsers/validators-search-parsers"

export const useValidatorsFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(validatorsSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        const parser =
          validatorsSearchFilters[key as keyof typeof validatorsSearchFilters]
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
