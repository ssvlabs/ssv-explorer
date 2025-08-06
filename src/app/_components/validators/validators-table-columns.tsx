"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Operator, type SearchValidator } from "@/types/api"
import { withNetwork } from "@/lib/utils/link"
import { add0x, remove0x, shortenAddress } from "@/lib/utils/strings"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { OperatorInfo } from "@/components/tooltip/operator-info"
import { ValidatorStatusBadge } from "@/components/validators/validator-status-badge"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const validatorColumns: Record<
  "publicKey" | "cluster" | "ownerAddress" | "operators" | "status",
  ColumnDefWithTitle<SearchValidator<Operator>>
> = {
  publicKey: {
    accessorKey: "publicKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public Key" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={withNetwork(`/validator/${row.original.public_key}`)}
        >
          <div>{shortenAddress(add0x(row.original.public_key))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.public_key} />
      </div>
    ),
    enableSorting: false,
  },
  cluster: {
    accessorKey: "cluster",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={withNetwork(`/cluster/${row.original.cluster}`)}
        >
          <div>{shortenAddress(remove0x(row.original.cluster))}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.cluster} />
      </div>
    ),
    enableSorting: false,
  },
  ownerAddress: {
    accessorKey: "ownerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={withNetwork(`/account/${row.original.owner_address}`)}
        >
          <div>{shortenAddress(row.original.owner_address)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.owner_address} />
      </div>
    ),
    enableSorting: false,
  },
  operators: {
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
            <Link
              href={withNetwork(`/operator/${operator.id}`)}
              key={operator.id}
            >
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
  status: {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <ValidatorStatusBadge size="sm" status={row.original.status} />
    ),
    enableSorting: false,
  },
}

export const validatorsTableColumns: ColumnDefWithTitle<
  SearchValidator<Operator>
>[] = [
  validatorColumns.publicKey,
  validatorColumns.ownerAddress,
  validatorColumns.cluster,
  validatorColumns.operators,
  validatorColumns.status,
]

export const validatorsOverviewTableColumns: ColumnDef<
  SearchValidator<Operator>
>[] = [
  validatorColumns.publicKey,
  validatorColumns.operators,
  validatorColumns.status,
]
