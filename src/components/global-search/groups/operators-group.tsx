import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { type Operator } from "@/types/api"
import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { OperatorInfo } from "@/components/operators/operator-info"

interface OperatorsGroupProps {
  query: UseInfiniteQueryResult<Operator[], unknown>
  onSelect: (group: "operator", value: Operator) => void
}

export function OperatorsGroup({ query, onSelect }: OperatorsGroupProps) {
  if (!query.data?.length && !query.hasNextPage) return null

  return (
    <CommandGroup>
      <Text
        variant="caption-bold"
        className="px-[14px] pb-2 pt-3 text-gray-500"
      >
        Operators
      </Text>
      {query.data?.map((operator) => (
        <CommandItem
          className="cursor-pointer"
          key={operator.id}
          value={operator.id.toString()}
          onSelect={() => {
            onSelect("operator", operator)
          }}
        >
          <OperatorInfo operator={operator} variant="full" />
        </CommandItem>
      ))}
      {query.hasNextPage && (
        <CommandItem
          className="cursor-pointer"
          value="load-more"
          onMouseDown={(e) => e.preventDefault()}
          onSelect={() => {
            query.fetchNextPage()
          }}
        >
          {query.isFetching ? "Loading..." : "Load more"}
        </CommandItem>
      )}
    </CommandGroup>
  )
}
