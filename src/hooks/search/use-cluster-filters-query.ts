import { useCallback, useMemo } from "react"
import { isEqual } from "lodash-es"
import { useQueryStates } from "nuqs"

import { clustersSearchFilters } from "@/lib/search-parsers/clusters-search-parsers"

export const useClusterFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(clustersSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        const parser =
          clustersSearchFilters[key as keyof typeof clustersSearchFilters]
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
