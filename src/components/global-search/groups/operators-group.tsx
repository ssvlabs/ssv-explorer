import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { type Operator } from "@/types/api"
import { Button } from "@/components/ui/button"
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
        <div className="mt-1 flex w-full justify-center">
          <Button
            size="sm"
            className="w-full text-primary-500"
            variant="ghost"
            isLoading={query.isFetching}
            onClick={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              query.fetchNextPage()
            }}
          >
            Load more
          </Button>
        </div>
      )}
    </CommandGroup>
  )
}
