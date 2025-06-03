"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Operator, type SearchValidator } from "@/types/api"
import { add0x, remove0x, shortenAddress } from "@/lib/utils/strings"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { OperatorInfo } from "@/components/tooltip/operator-info"
import { ValidatorStatusBadge } from "@/components/validators/validator-status-badge"

export const validatorsTableColumns: ColumnDef<SearchValidator<Operator>>[] = [
  {
    accessorKey: "publicKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public Key" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={`/validator/${row.original.public_key}`}
        >
          <div>{shortenAddress(add0x(row.original.public_key))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.public_key} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "cluster",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={`/cluster/${row.original.cluster}`}
        >
          <div>{shortenAddress(remove0x(row.original.cluster))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.cluster} />
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
          href={`/account/${row.original.owner_address}`}
        >
          <div>{shortenAddress(row.original.owner_address)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.owner_address} />
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
        {row.original.operators.map((operator) => (
          <Tooltip
            asChild
            key={operator.id}
            className="w-[240px] p-4"
            content={<OperatorInfo operator={operator} />}
          >
            <Link href={`/operator/${operator.id}`} key={operator.id}>
              <OperatorAvatar
                src={operator.logo}
                isPrivate={operator.is_private}
              />
            </Link>
          </Tooltip>
        ))}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <ValidatorStatusBadge size="sm" status={row.original.status} />
    ),
    enableSorting: false,
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ row }) => {
  //     console.log("row.original.created_at:", row.original.created_at)
  //     const date = new Date(row.original.created_at)
  //     if (!date) return null
  //     return (
  //       <Tooltip asChild content={formatFullDate(date)}>
  //         <Text className="w-fit text-gray-600">{getRelativeTime(date)}</Text>
  //       </Tooltip>
  //     )
  //   },
  //   enableSorting: true,
  // },
]

export const validatorsTablePreviewColumns = validatorsTableColumns.filter(
  (column) =>
    // @ts-expect-error accessorKey is not defined in the type
    ["publicKey", "ownerAddress", "status"].includes(column.accessorKey)
)
