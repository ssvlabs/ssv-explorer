/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ParserBuilder } from "nuqs"

import { accountsSearchFilters } from "@/lib/search-parsers/accounts-search-parsers"
import { clustersSearchFilters } from "@/lib/search-parsers/clusters-search-parsers"
import { eventsSearchFilters } from "@/lib/search-parsers/events-search-parsers"
import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import { validatorsSearchFilters } from "@/lib/search-parsers/validators-search-parsers"
import { useFiltersQuery } from "@/hooks/search/use-filters-query"

import { useNetworkQuery } from "./use-network-query"
import { usePaginationQuery } from "./use-pagination-query"

export const useCustomSearchParams = <
  T extends Record<string, ParserBuilder<any>>,
>(
  searchFilters: T
) => {
  const { query } = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useFiltersQuery(searchFilters)

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

export const useClustersSearchParams = () =>
  useCustomSearchParams(clustersSearchFilters)
export const useOperatorsSearchParams = () =>
  useCustomSearchParams(operatorSearchFilters)
export const useValidatorsSearchParams = () =>
  useCustomSearchParams(validatorsSearchFilters)
export const useAccountsSearchParams = () =>
  useCustomSearchParams(accountsSearchFilters)
export const useEventsSearchParams = () =>
  useCustomSearchParams(eventsSearchFilters)
