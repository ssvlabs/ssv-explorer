import { useNetworkQuery } from "./use-network-query"
import { useOperatorFiltersQuery } from "./use-operator-filters-query"
import { usePaginationQuery } from "./use-pagination-query"

export const useOperatorsSearchParams = () => {
  const { query } = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useOperatorFiltersQuery()

  return {
    network: query.value,
    setNetwork: query.set,
    pagination,
    setPagination,
    filters,
    setFilters,
    enabledFilters,
    clearFilters,
  }
}
