import { useTable } from "@/context/table-context"
import { Collapse } from "react-collapse"

import {
  accountsSearchFilters,
  type AccountSearchFilterKeys,
} from "@/lib/search-parsers/accounts-search-parsers"
import { cn } from "@/lib/utils"
import { useAccountsSearchParams } from "@/hooks/search/use-custom-search-params"
import { Button } from "@/components/ui/button"
import { textVariants } from "@/components/ui/text"
import { HexFilter } from "@/app/_components/shared/filters/address-filter"
import { RangeFilter } from "@/app/_components/shared/filters/range-filter"

export const AccountTableFilters = () => {
  const { isFiltersOpen } = useTable()
  const { enabledFilters, clearFilters } = useAccountsSearchParams()

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
        <HexFilter<AccountSearchFilterKeys>
          name="Owner Address"
          searchQueryKey="ownerAddress"
          invalidMessage="Invalid owner address"
          parser={accountsSearchFilters.ownerAddress}
        />
        <HexFilter<AccountSearchFilterKeys>
          name="Fee Recipient Address"
          searchQueryKey="recipientAddress"
          invalidMessage="Invalid recipient address"
          parser={accountsSearchFilters.recipientAddress}
        />
        <RangeFilter<AccountSearchFilterKeys>
          name="Operators"
          searchQueryKey="operators"
          parser={accountsSearchFilters.operators}
          suffix=""
          step={1}
          decimals={0}
        />
        <RangeFilter<AccountSearchFilterKeys>
          name="Clusters"
          searchQueryKey="clusters"
          parser={accountsSearchFilters.clusters}
          suffix=""
          step={1}
          decimals={0}
        />
        <RangeFilter<AccountSearchFilterKeys>
          name="Validators"
          searchQueryKey="validators"
          parser={accountsSearchFilters.validators}
          suffix=""
          step={1}
          decimals={0}
        />
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
