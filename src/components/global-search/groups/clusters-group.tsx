import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { type Cluster } from "@/types/api"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Text } from "@/components/ui/text"

interface ClustersGroupProps {
  query: UseInfiniteQueryResult<Cluster[], unknown>
  onSelect: (group: "cluster", value: Cluster) => void
}

export function ClustersGroup({ query, onSelect }: ClustersGroupProps) {
  if (!query.data?.length && !query.hasNextPage) return null

  return (
    <CommandGroup>
      <Text
        variant="caption-bold"
        className="px-[14px] pb-2 pt-3 text-gray-500"
      >
        Clusters
      </Text>
      {query.data?.map((cluster) => (
        <CommandItem
          className="px-5 py-1"
          key={cluster.clusterId}
          onSelect={() => {
            onSelect("cluster", cluster)
          }}
        >
          {shortenAddress(cluster.clusterId)}
        </CommandItem>
      ))}
      {query.hasNextPage && (
        <div className="mt-1 flex w-full justify-center">
          <Button
            size="sm"
            className="w-full"
            variant="ghost"
            isLoading={query.isFetching}
            onClick={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              query.fetchNextPage()
            }}
          >
            Loadmore
          </Button>
        </div>
      )}
    </CommandGroup>
  )
}
