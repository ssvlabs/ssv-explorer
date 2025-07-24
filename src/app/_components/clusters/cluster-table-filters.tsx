import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { addressesParser } from "@/lib/search-parsers/shared/parsers"
import { cn } from "@/lib/utils"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { ClusterIdFilter } from "@/app/_components/clusters/filters/cluster-id-filter"
import { IsLiquidatedFilter } from "@/app/_components/clusters/filters/is-liquidated-filter"
import { OperatorsFilter } from "@/app/_components/clusters/filters/operators-filter"
import { StatusFilter } from "@/app/_components/clusters/filters/status-filter"
import { AddressFilter } from "@/app/_components/shared/filters/address-filter"

export const ClusterTableFilters = () => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useClustersSearchParams()

  return (
    <Collapse isOpened={isFiltersOpen}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 overflow-hidden border-t border-gray-300 py-2 transition-opacity duration-300",
          {
            "opacity-100": isFiltersOpen,
            "invisible opacity-0": !isFiltersOpen,
          }
        )}
        aria-hidden={!isFiltersOpen}
      >
        <ClusterIdFilter />
        <AddressFilter
          name="Owner Address"
          searchQueryKey="ownerAddress"
          parser={addressesParser}
        />
        <StatusFilter />
        <IsLiquidatedFilter />
        <OperatorsFilter />
        {enabledFilters.count > 0 && (
          <Button
            variant="ghost"
            name="Clear"
            className={textVariants({
              variant: "body-3-medium",
              className: "text-primary-500",
            })}
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </div>
    </Collapse>
  )
}
