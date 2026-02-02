import { useTable } from "@/context/table-context"
import { UnmountClosed } from "react-collapse"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search-parsers"
import {
  validatorsSearchParsers,
  type ValidatorSearchFilterKeys,
} from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import { useValidatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { OperatorsFilter } from "@/app/_components/clusters/filters/operators-filter"
import { HexFilter } from "@/app/_components/shared/filters/address-filter"
import { DateRangeFilter } from "@/app/_components/shared/filters/date-range-filter"
import { EffectiveBalanceFilter } from "@/app/_components/validators/filters/effective-balance-filter"
import { StatusFilter } from "@/app/_components/validators/filters/status-filter"

export type ValidatorTableFiltersProps = {
  hidePublicKeyFilter?: boolean
  hideClusterIdFilter?: boolean
  hideOwnerAddressFilter?: boolean
  hideOperatorsFilter?: boolean
  className?: string
}

export const ValidatorTableFilters = ({
  hidePublicKeyFilter,
  hideClusterIdFilter,
  hideOwnerAddressFilter,
  hideOperatorsFilter,
  className,
}: ValidatorTableFiltersProps) => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useValidatorsSearchParams()

  return (
    <UnmountClosed
      isOpened={isFiltersOpen}
      colSpan={2}
      style={{ border: "1px solid red" }}
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
        {!hidePublicKeyFilter && (
          <HexFilter<ValidatorSearchFilterKeys>
            name="Public Key"
            searchQueryKey="publicKey"
            placeholder="Enter or paste public key"
            invalidMessage="Invalid public key"
            parser={validatorsSearchParsers.publicKey}
          />
        )}
        {!hideClusterIdFilter && (
          <HexFilter<ValidatorSearchFilterKeys>
            name="Cluster ID"
            searchQueryKey="cluster"
            placeholder="Enter or paste cluster ID"
            invalidMessage="Invalid cluster ID"
            parser={validatorsSearchParsers.cluster}
          />
        )}
        {!hideOwnerAddressFilter && (
          <HexFilter<ValidatorSearchFilterKeys>
            name="Owner Address"
            searchQueryKey="ownerAddress"
            placeholder="Enter or paste owner address"
            parser={validatorsSearchParsers.ownerAddress}
            invalidMessage="Invalid owner address"
          />
        )}
        {!hideOperatorsFilter && <OperatorsFilter searchQueryKey="operator" />}
        <StatusFilter />
        <DateRangeFilter
          name="Created At"
          searchQueryKey="dateRange"
          parser={validatorsSearchParsers.dateRange}
        />
        <EffectiveBalanceFilter />
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
    </UnmountClosed>
  )
}
