"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Account } from "@/types/api/account"
import { shortenAddress } from "@/lib/utils/strings"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

export const accountsTableColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.original.id}</div>,
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
          href={`/account/${row.original.ownerAddress}`}
        >
          <div>{shortenAddress(row.original.ownerAddress)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.ownerAddress} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "recipientAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient Address" />
    ),
    cell: ({ row }) =>
      row.original.recipientAddress ? (
        <div className="flex items-center gap-1">
          <Text
            className="font-mono text-primary-500"
            as={Link}
            href={`/account/${row.original.recipientAddress}`}
          >
            <div>{shortenAddress(row.original.recipientAddress)}</div>
          </Text>
          <CopyBtn
            className="text-gray-500"
            text={row.original.recipientAddress}
          />
        </div>
      ) : (
        <div>-</div>
      ),
    enableSorting: false,
  },
  {
    accessorKey: "version",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version" />
    ),
    cell: ({ row }) => <div>{row.original.version}</div>,
  },
]
