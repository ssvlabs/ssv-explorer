"use client"

import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNowStrict } from "date-fns"

import { type Cluster } from "@/types/api"
import { formatSSV, numberFormatter } from "@/lib/utils/number"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import { ClusterStatusBadge } from "@/components/clusters/cluster-status-badge"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { OperatorInfo } from "@/components/tooltip/operator-info"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const clustersTableColumns: ColumnDefWithTitle<Cluster>[] = [
  {
    accessorKey: "clusterId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          href={`/${useNetworkParam()}/cluster/${row.original.clusterId}`}
        >
          <div>{shortenAddress(remove0x(row.original.clusterId))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.clusterId} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ownerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          href={`/${useNetworkParam()}/account/${row.original.ownerAddress}`}
        >
          <div>{shortenAddress(row.original.ownerAddress)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.ownerAddress} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "operators",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operators" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.operators.map((operator) => {
          return (
            <Tooltip
              asChild
              key={operator.public_key}
              className="w-[240px] p-4"
              content={<OperatorInfo operator={operator} />}
            >
              <Link
                href={`/${useNetworkParam()}/operator/${operator.id}`}
                key={operator.id}
              >
                <OperatorAvatar
                  src={operator.logo}
                  isPrivate={operator.is_private}
                />
              </Link>
            </Tooltip>
          )
        })}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      const { ethBalance, balance, migrated } = row.original

      return (
        <div className="flex items-center gap-2">
          <Image
            src={
              migrated
                ? "/images/networks/dark.svg"
                : "/images/ssvIcons/icon.svg"
            }
            alt={migrated ? "ETH" : "SSV"}
            width={16}
            height={16}
            className="object-fit size-4"
          />
          <Text>{formatSSV(BigInt(migrated ? ethBalance : balance))}</Text>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "effectiveBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Effective Balance" />
    ),
    cell: ({ row }) => {
      const effectiveBalance = BigInt(row.original.effectiveBalance || 0)
      if (effectiveBalance > 0) {
        return (
          <div className="flex items-center gap-2">
            <Image
              src="/images/networks/dark.svg"
              alt="ETH"
              width={16}
              height={16}
              className="object-fit size-4"
            />
            <Text>{numberFormatter.format(Number(effectiveBalance))}</Text>
          </div>
        )
      }
      return <Text className="text-gray-400">-</Text>
    },
  },
  {
    accessorKey: "validatorCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators" />
    ),
    cell: ({ row }) => <div>{row.original.validatorCount}</div>,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-end text-right"
        column={column}
        title="Active"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ClusterStatusBadge active={row.original.active} />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <Text variant="body-3-medium" className="text-gray-600">
        {formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true })}
      </Text>
    ),
  },
] satisfies ColumnDef<Cluster>[]

export type ClusterColumnsAccessorKeys =
  (typeof clustersTableColumns)[number]["accessorKey"]

export const clustersTableDefaultColumnsKeys: ClusterColumnsAccessorKeys[] = [
  "clusterId",
  "ownerAddress",
  "operators",
  "validatorCount",
  "balance",
  "effectiveBalance",
  "active",
]

export const clustersTableDefaultColumns = clustersTableColumns.reduce(
  (acc, col) => {
    acc[col.accessorKey] = clustersTableDefaultColumnsKeys.includes(
      col.accessorKey
    )
    return acc
  },
  {} as Record<ClusterColumnsAccessorKeys, boolean>
)
