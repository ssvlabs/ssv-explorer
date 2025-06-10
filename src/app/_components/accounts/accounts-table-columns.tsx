"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Account } from "@/types/api/account"
import { formatGwei } from "@/lib/utils/number"
import { shortenAddress } from "@/lib/utils/strings"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

export const accountsTableColumns: ColumnDef<Account>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.id}</div>,
  // },
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
      row.original.recipientAddress && (
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
      ),
    enableSorting: false,
  },
  {
    accessorKey: "effectiveBalance",
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nativeCurrency = useNativeCurrency()
      return (
        <DataTableColumnHeader
          column={column}
          title={`${nativeCurrency.symbol} Staked`}
        />
      )
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nativeCurrency = useNativeCurrency()
      return (
        <div>
          {formatGwei(BigInt(row.original.effectiveBalance || 0))}{" "}
          {nativeCurrency.symbol}
        </div>
      )
    },
  },
]
