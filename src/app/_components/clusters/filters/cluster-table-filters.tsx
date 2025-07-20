import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { cn } from "@/lib/utils"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { ClusterIdFilter } from "@/app/_components/clusters/filters/cluster-id-filter"
import { IsLiquidatedFilter } from "@/app/_components/clusters/filters/is-liquidated-filter"

import { OperatorsFilter } from "./operators-filter"
import { OwnerAddressFilter } from "./owner-address-filter"
import { StatusFilter } from "./status-filter"

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
        <ClusterIdFilter  />
        <OwnerAddressFilter />
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
