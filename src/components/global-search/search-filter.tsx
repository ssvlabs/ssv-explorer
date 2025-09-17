import { type FC } from "react"

import { Tab } from "@/components/ui/tab"

export enum SearchFilterType {
  All = "All",
  Cluster = "Cluster",
  Operator = "Operator",
  Validator = "Validator",
  Account = "Account",
}

export const searchFiltersOrder = [
  SearchFilterType.All,
  SearchFilterType.Operator,
  SearchFilterType.Validator,
  SearchFilterType.Cluster,
  SearchFilterType.Account,
]

export const SearchFilter: FC<{
  value: SearchFilterType
  onSelect: (type: SearchFilterType) => void
}> = ({ value, onSelect }) => {
  return (
    <div className="flex gap-1 pb-2">
      {searchFiltersOrder.map((type) => (
        <Tab
          key={type}
          data-active={type === value}
          onClick={() => onSelect(type)}
        >
          {type}
        </Tab>
      ))}
    </div>
  )
}
