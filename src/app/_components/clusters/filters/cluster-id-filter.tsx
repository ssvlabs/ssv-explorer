"use client"

import { FC, useState } from "react"
import { searchClusters } from "@/api/clusters"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"
import { useQueryState } from "nuqs"

import { clustersSearchFilters } from "@/lib/search-parsers/clusters-search-parsers"
import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { useNetworkQuery } from "@/hooks/search/use-network-query"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"

type ClusterIdFilterProps = {
  searchQueryKey?: string
}

export const ClusterIdFilter: FC<ClusterIdFilterProps> = ({
  searchQueryKey = "cluster",
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")

  const network = useNetworkQuery().query.value
  const [clusterIds, setClusterIds] = useQueryState(
    searchQueryKey,
    clustersSearchFilters.clusterId
  )

  const query = useQuery({
    queryKey: ["clusters", "ids", search, network],
    queryFn: async () => {
      return searchClusters({
        search,
        network,
        page: 1,
        perPage: 10,
      })
    },
    enabled: open,
  })

  const filteredClusters = query.data?.clusters.filter((cluster) =>
    cluster.clusterId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <FilterButton
      name="Cluster ID"
      activeFiltersCount={clusterIds?.length ?? 0}
      onClear={() => setClusterIds(null)}
      popover={{
        root: {
          open,
          onOpenChange: setOpen,
        },
        content: {
          className: "w-[320px]",
        },
      }}
    >
      <Command>
        <div className="p-2">
          <CommandInput
            placeholder="Search Cluster IDs"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>
        {Boolean(clusterIds?.length) && (
          <div className="flex flex-wrap gap-1 border-y border-gray-200 p-2">
            {clusterIds?.map((id) => (
              <Button
                size="sm"
                key={id}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() => setClusterIds(xor(clusterIds, [id]))}
              >
                <Text variant="caption-medium">{shortenAddress(id)}</Text>{" "}
                <div className="flex size-4 items-center justify-center">
                  <X className="size-2.5" />
                </div>
              </Button>
            ))}
          </div>
        )}
        <CommandList className="max-h-none overflow-y-auto">
          {query.isLoading ? (
            <CommandLoading className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          ) : (
            <CommandEmpty>This list is empty.</CommandEmpty>
          )}
          {filteredClusters?.map((cluster) => (
            <CommandItem
              key={cluster.clusterId}
              value={cluster.clusterId}
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() =>
                setClusterIds(xor(clusterIds, [cluster.clusterId]))
              }
            >
              <Checkbox
                id={cluster.clusterId}
                checked={clusterIds?.includes(cluster.clusterId)}
                className="mr-2"
              />
              <span
                className={cn(
                  "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                )}
              >
                {shortenAddress(cluster.clusterId)}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </FilterButton>
  )
}
