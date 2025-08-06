"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Account } from "@/types/api/account"
import { withNetwork } from "@/lib/utils/link"
import { formatGwei } from "@/lib/utils/number"
import { shortenAddress } from "@/lib/utils/strings"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const accountColumns = {
  ownerAddress: {
    accessorKey: "ownerAddress",
    title: "Owner Address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Text
          className="font-mono text-primary-500"
          as={Link}
          href={withNetwork(`/account/${row.original.ownerAddress}`)}
        >
          <div>{shortenAddress(row.original.ownerAddress)}</div>
        </Text>
        <CopyBtn className="text-gray-500" text={row.original.ownerAddress} />
      </div>
    ),
    enableSorting: false,
  },
  recipientAddress: {
    accessorKey: "recipientAddress",
    title: "Recipient Address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient Address" />
    ),
    cell: ({ row }) =>
      row.original.recipientAddress && (
        <div className="flex items-center gap-1">
          <Text
            className="font-mono text-primary-500"
            as={Link}
            href={withNetwork(`/account/${row.original.recipientAddress}`)}
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
  operator: {
    accessorKey: "operator",
    title: "Operator Count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Operator Count"
        className="w-[119px]"
      />
    ),
    cell: ({ row }) => row.original.operators,
  },
  cluster: {
    accessorKey: "cluster",
    title: "Cluster Count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cluster Count"
        className="w-[119px]"
      />
    ),
    cell: ({ row }) => row.original.clusters,
  },
  validator: {
    accessorKey: "validator",
    title: "Validator Count",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validator Count"
        className="w-[119px]"
      />
    ),
    cell: ({ row }) => row.original.validators,
  },
  effectiveBalance: {
    accessorKey: "effectiveBalance",
    title: `Total ETH Staked`,
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
} satisfies Record<string, ColumnDefWithTitle<Account>>

export const accountsTableColumns = [
  accountColumns.ownerAddress,
  accountColumns.recipientAddress,
  accountColumns.operator,
  accountColumns.cluster,
  accountColumns.validator,
  accountColumns.effectiveBalance,
] satisfies ColumnDef<Account>[]

export const accountsDefaultColumnVisibility: Partial<
  Record<keyof typeof accountColumns, boolean>
> = {
  ownerAddress: true,
  operator: true,
  cluster: true,
  validator: true,
}
