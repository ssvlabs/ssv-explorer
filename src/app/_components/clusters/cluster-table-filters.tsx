import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import {
  clustersSearchFilters,
  type ClusterSearchFilterKeys,
} from "@/lib/search-parsers/clusters-search-parsers"
import { cn } from "@/lib/utils"
import { useClustersSearchParams } from "@/hooks/search/use-custom-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { IsLiquidatedFilter } from "@/app/_components/clusters/filters/is-liquidated-filter"
import { OperatorsFilter } from "@/app/_components/clusters/filters/operators-filter"
import { StatusFilter } from "@/app/_components/clusters/filters/status-filter"
import { HexFilter } from "@/app/_components/shared/filters/address-filter"

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
        <HexFilter<ClusterSearchFilterKeys>
          name="Cluster ID"
          searchQueryKey="clusterId"
          invalidMessage="Invalid cluster ID"
          parser={clustersSearchFilters.clusterId}
        />
        <HexFilter<ClusterSearchFilterKeys>
          name="Owner Address"
          searchQueryKey="ownerAddress"
          invalidMessage="Invalid owner address"
          parser={clustersSearchFilters.ownerAddress}
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
