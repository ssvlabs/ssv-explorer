import { useNetworkQuery } from "./use-network-query"
import { usePaginationQuery } from "./use-pagination-query"
import { useValidatorsFiltersQuery } from "./use-validators-filters-query"

export const useValidatorsSearchParams = () => {
  const { query } = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useValidatorsFiltersQuery()

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
