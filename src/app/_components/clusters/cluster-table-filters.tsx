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
import { EffectiveBalanceFilter } from "@/app/_components/clusters/filters/effective-balance-filter"
import { IsLiquidatedFilter } from "@/app/_components/clusters/filters/is-liquidated-filter"
import { OperatorsFilter } from "@/app/_components/clusters/filters/operators-filter"
import { StatusFilter } from "@/app/_components/clusters/filters/status-filter"
import { HexFilter } from "@/app/_components/shared/filters/address-filter"

export type ClusterTableFiltersProps = {
  hideClusterIdFilter?: boolean
  hideOwnerAddressFilter?: boolean
  className?: string
}

export const ClusterTableFilters = ({
  hideClusterIdFilter,
  hideOwnerAddressFilter,
  className,
}: ClusterTableFiltersProps) => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useClustersSearchParams()

  return (
    <Collapse
      isOpened={isFiltersOpen}
      theme={{
        collapse: cn("ReactCollapse--collapse", className),
      }}
    >
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
        {!hideClusterIdFilter && (
          <HexFilter<ClusterSearchFilterKeys>
            name="Cluster ID"
            searchQueryKey="cluster"
            invalidMessage="Invalid cluster ID"
            parser={clustersSearchFilters.cluster}
          />
        )}
        {!hideOwnerAddressFilter && (
          <HexFilter<ClusterSearchFilterKeys>
            name="Owner Address"
            searchQueryKey="ownerAddress"
            invalidMessage="Invalid owner address"
            parser={clustersSearchFilters.ownerAddress}
          />
        )}
        <OperatorsFilter />
        <EffectiveBalanceFilter />
        <StatusFilter />
        <IsLiquidatedFilter />
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
