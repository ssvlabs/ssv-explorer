import { useClusterFiltersQuery } from "./use-cluster-filters-query"
import { useNetworkQuery } from "./use-network-query"
import { usePaginationQuery } from "./use-pagination-query"

export const useClustersSearchParams = () => {
  const { query } = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useClusterFiltersQuery()

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
