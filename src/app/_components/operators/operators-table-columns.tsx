"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNowStrict } from "date-fns"

import { type Operator } from "@/types/api"
import { getYearlyFee } from "@/lib/utils/operator"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { MevRelaysDisplay } from "@/components/mev-relays-display"
import { OperatorInfo } from "@/components/operators/operator-info"
import { OperatorPerformanceTooltip } from "@/components/operators/operator-performance-tooltip"
import { OperatorStatusBadge } from "@/components/operators/operator-status-badge"
import { PerformanceText } from "@/components/operators/performance-text"

export const operatorColumns: Record<
  | "id"
  | "name"
  | "ownerAddress"
  | "location"
  | "eth1NodeClient"
  | "eth2NodeClient"
  | "fee"
  | "validatorsCount"
  | "performance24h"
  | "performance30d"
  | "mevRelays"
  | "status"
  | "created_at",
  ColumnDef<Operator>
> = {
  id: {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-4">{row.original.id}</div>,
    // enableSorting: false,
  },
  name: {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <OperatorInfo variant="minimal" operator={row.original} />
    ),
    enableSorting: false,
  },
  ownerAddress: {
    accessorKey: "ownerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => {
      const ownerAddress = row.original.owner_address
      return (
        <div className="flex gap-1">
          <Button asChild variant="link">
            <Link href={`/account/${ownerAddress}`} className="font-mono">
              {shortenAddress(ownerAddress)}
            </Link>
          </Button>
          <CopyBtn className="text-gray-500" text={ownerAddress} />
        </div>
      )
    },
    enableSorting: false,
  },
  location: {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.original.location}</div>
    ),
    enableSorting: false,
  },
  eth1NodeClient: {
    accessorKey: "eth1NodeClient",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eth1 Node Client" />
    ),
    cell: ({ row }) => <div>{row.original.eth1_node_client}</div>,
    enableSorting: false,
  },
  eth2NodeClient: {
    accessorKey: "eth2NodeClient",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eth2 Node Client" />
    ),
    cell: ({ row }) => <div>{row.original.eth2_node_client}</div>,
    enableSorting: false,
  },
  fee: {
    accessorKey: "fee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee" />
    ),
    cell: ({ row }) => (
      <div>{getYearlyFee(BigInt(row.original.fee), { format: true })}</div>
    ),
  },
  validatorsCount: {
    accessorKey: "validatorsCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators Count" />
    ),
    cell: ({ row }) => <div>{row.original.validators_count}</div>,
  },
  performance24h: {
    accessorKey: "performance24h",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-end text-right"
        column={column}
        title="24h"
      />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["24h"]
      return (
        <div className="flex items-center justify-end">
          <OperatorPerformanceTooltip>
            <PerformanceText className="text-right" performance={performance} />
          </OperatorPerformanceTooltip>
        </div>
      )
    },
  },
  performance30d: {
    accessorKey: "performance30d",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="30d"
        className="justify-end text-right"
      />
    ),
    cell: ({ row }) => {
      const performance = row.original.performance["30d"]
      return (
        <div className="flex items-center justify-end">
          <OperatorPerformanceTooltip>
            <PerformanceText className="text-right" performance={performance} />
          </OperatorPerformanceTooltip>
        </div>
      )
    },
  },
  mevRelays: {
    accessorKey: "mevRelays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MEV Relays" />
    ),
    cell: ({ row }) => {
      return <MevRelaysDisplay mevRelays={row.original.mev_relays} />
    },
    enableSorting: false,
  },
  status: {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return <OperatorStatusBadge size="sm" status={status} />
    },
  },
  created_at: {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registered" />
    ),
    cell: ({ row }) => {
      return (
        <Text className="text-sm text-gray-500">
          {formatDistanceToNowStrict(row.original.created_at, {
            addSuffix: true,
          })}
        </Text>
      )
    },
  },
}

export const operatorsTableColumns = [
  operatorColumns.id,
  operatorColumns.name,
  operatorColumns.ownerAddress,
  operatorColumns.location,
  operatorColumns.eth1NodeClient,
  operatorColumns.eth2NodeClient,
  operatorColumns.fee,
  operatorColumns.validatorsCount,
  operatorColumns.performance24h,
  operatorColumns.performance30d,
  operatorColumns.mevRelays,
  operatorColumns.status,
  operatorColumns.created_at,
] satisfies ColumnDef<Operator>[]

export type OperatorColumnsAccessorKeys = keyof typeof operatorColumns

export const operatorsTableDefaultColumnsKeys: OperatorColumnsAccessorKeys[] = [
  "id",
  "name",
  "ownerAddress",
  "fee",
  "validatorsCount",
  "performance24h",
  "status",
]

export const operatorsTableDefaultColumns = Object.keys(operatorColumns).reduce(
  (acc, key) => {
    const typedKey = key as OperatorColumnsAccessorKeys
    acc[typedKey] = operatorsTableDefaultColumnsKeys.includes(typedKey)
    return acc
  },
  {} as Record<OperatorColumnsAccessorKeys, boolean>
)

export const operatorsTablePreviewColumns = [
  operatorColumns.name,
  operatorColumns.ownerAddress,
  operatorColumns.performance24h,
  operatorColumns.status,
].map((c) => ({ ...c, enableSorting: false }))
