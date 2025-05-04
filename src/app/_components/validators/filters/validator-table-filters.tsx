import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { cn } from "@/lib/utils"
import { useValidatorsSearchParams } from "@/hooks/search/use-validators-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { ClusterIdFilter } from "@/app/_components/clusters/filters/cluster-id-filter"
import { OperatorsFilter } from "@/app/_components/clusters/filters/operators-filter"
import { OwnerAddressFilter } from "@/app/_components/validators/filters/owner-address-filter"
import { PublicKeyFilter } from "@/app/_components/validators/filters/public-key-filter"

export const ValidatorTableFilters = () => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useValidatorsSearchParams()

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
        <PublicKeyFilter />
        <ClusterIdFilter />
        <OwnerAddressFilter />
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
