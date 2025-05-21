import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { MevRelaysFilter } from "@/app/_components/operators/filters/mev-relays-filter"

import { Eth1ClientFilter } from "./eth1-client-filter"
import { Eth2ClientFilter } from "./eth2-client-filter"
import { FeeFilter } from "./fee-filter"
import { IdFilter } from "./id-filter"
import { LocationFilter } from "./location-filter"
import { NameFilter } from "./name-filter"
import { OwnerAddressFilter } from "./owner-address-filter"
import { Performance24hFilter } from "./performance-24h-filter"
import { Performance30dFilter } from "./performance-30d-filter"
import { ValidatorsFilter } from "./validators-filter"
import { VerifiedFilter } from "./verified-filter"
import { IsPrivateFilter } from "./visibility-filter"

export const OperatorTableFilters = () => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useOperatorsSearchParams()

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
        <IdFilter />
        <NameFilter />
        <OwnerAddressFilter />
        <LocationFilter />
        <Eth1ClientFilter />
        <Eth2ClientFilter />
        <FeeFilter />
        <MevRelaysFilter />
        <ValidatorsFilter />
        {/* <ManagedEthFilter /> */}
        <Performance24hFilter />
        <Performance30dFilter />
        {/* <StatusFilter /> */}
        <VerifiedFilter />
        <IsPrivateFilter />
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
