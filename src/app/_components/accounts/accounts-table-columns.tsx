"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { type Account } from "@/types/api/account"
import { formatGwei } from "@/lib/utils/number"
import { shortenAddress } from "@/lib/utils/strings"
import { useNativeCurrency } from "@/hooks/app/use-native-currency"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
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
  recipientAddress: {
    accessorKey: "recipientAddress",
    title: "Fee Recipient Address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee Recipient Address" />
    ),
    cell: ({ row }) =>
      row.original.recipientAddress && (
        <div className="flex items-center gap-1">
          <Text
            className="font-mono text-primary-500"
            as={Link}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            href={`/${useNetworkParam()}/account/${row.original.recipientAddress}`}
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
  totalOperatorEthManaged: {
    accessorKey: "totalOperatorEthManaged",
    title: "ETH Managed",
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nativeCurrency = useNativeCurrency()
      return (
        <DataTableColumnHeader
          column={column}
          title={`${nativeCurrency.symbol} Managed`}
          className="flex justify-end text-right"
        />
      )
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nativeCurrency = useNativeCurrency()
      return (
        <div className="text-right">
          {row.original.totalOperatorEthManaged || 0} {nativeCurrency.symbol}
        </div>
      )
    },
    enableSorting: false,
  },
  operator: {
    accessorKey: "operator",
    title: "Operators",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Operators"
        className="justify-end text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original.operators}</div>
    ),
  },
  cluster: {
    accessorKey: "cluster",
    title: "Clusters",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Clusters"
        className="justify-end text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original.clusters}</div>
    ),
  },
  validator: {
    accessorKey: "validator",
    title: "Validators",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validators"
        className="flex justify-end text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original.validators}</div>
    ),
  },
  effectiveBalance: {
    accessorKey: "effectiveBalance",
    title: `Effective Balance`,
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Effective Balance"
          className="flex justify-end text-right"
        />
      )
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nativeCurrency = useNativeCurrency()
      return (
        <div className="text-right">
          {formatGwei(BigInt(row.original.effectiveBalance || 0))}{" "}
          {nativeCurrency.symbol}
        </div>
      )
    },
    enableSorting: false,
  },
} satisfies Record<string, ColumnDefWithTitle<Account>>

export const accountsTableColumns = [
  accountColumns.ownerAddress,
  accountColumns.recipientAddress,
  accountColumns.totalOperatorEthManaged,
  accountColumns.effectiveBalance,
  accountColumns.operator,
  accountColumns.cluster,
  accountColumns.validator,
] satisfies ColumnDef<Account>[]

export const accountsDefaultColumnVisibility: Partial<
  Record<keyof typeof accountColumns, boolean>
> = {
  ownerAddress: true,
  operator: true,
  cluster: true,
  validator: true,
  effectiveBalance: true,
  recipientAddress: false,
}
