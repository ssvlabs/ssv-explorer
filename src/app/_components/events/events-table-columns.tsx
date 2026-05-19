/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { format, formatDistanceToNowStrict } from "date-fns"

import { type AccountEvent } from "@/types/api/events"
import { toSentenceCase } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { useLinks } from "@/hooks/use-links"
import { AccountEventIcon } from "@/components/ui/account-event-icon"
import { Button } from "@/components/ui/button"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const eventsColumns = {
  event: {
    accessorKey: "event",
    size: 500,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    cell: ({ row }) => {
      const { etherscanTx } = useLinks()
      return (
        <Tooltip content="Click to view on Etherscan" asChild>
          <Link
            href={etherscanTx(row.original.transactionHash)}
            target="_blank"
            className="group flex w-fit cursor-pointer items-center gap-2 rounded-lg"
          >
            <AccountEventIcon event={row.original.event} />
            <Text className="group-hover:text-primary-500 group-hover:underline">
              {toSentenceCase(row.original.event)}
            </Text>
          </Link>
        </Tooltip>
      )
    },
    enableSorting: false,
  },
  ownerAddress: {
    accessorKey: "ownerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Address" />
    ),
    cell: ({ row }) => {
      const ownerAddress = row.original.ownerAddress
      return (
        <div className="flex gap-1">
          <Button
            variant="link"
            as={Link}
            href={`/${useNetworkParam()}/account/${ownerAddress}`}
            className="font-mono"
          >
            {shortenAddress(ownerAddress)}
          </Button>
          <CopyBtn className="text-gray-500" text={ownerAddress} />
        </div>
      )
    },
    enableSorting: false,
  },
  blockNumber: {
    accessorKey: "blockNumber",
    title: "Block",
    size: 220,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-center pl-[100px] text-center"
        title="Block"
      />
    ),
    cell: ({ row }) => {
      return (
        <Text
          variant="body-3-medium"
          className="pl-[100px] text-center text-gray-600"
        >
          {row.original.blockNumber}
        </Text>
      )
    },
  },
  createdAt: {
    accessorKey: "createdAt",
    title: "Age",
    size: 160,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end text-end"
        title="Age"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return (
        <Tooltip
          content={format(date, "MMM d, yyyy HH:mm:ss")}
          asChild
          align="end"
        >
          <div className="flex cursor-default justify-end">
            <Text variant="body-3-medium" className="text-gray-600">
              {formatDistanceToNowStrict(date, { addSuffix: true })}
            </Text>
          </div>
        </Tooltip>
      )
    },
  },
} satisfies Record<string, ColumnDefWithTitle<AccountEvent>>

export const eventsTableColumns = [
  eventsColumns.event,
  eventsColumns.blockNumber,
  eventsColumns.createdAt,
] satisfies ColumnDef<AccountEvent>[]

export const overviewEventsTableColumns = [
  eventsColumns.event,
  eventsColumns.blockNumber,
  eventsColumns.createdAt,
].map((c) => ({ ...c, enableSorting: false }))

export const eventsDefaultColumnVisibility: Partial<
  Record<keyof typeof eventsColumns, boolean>
> = {
  event: true,
  blockNumber: true,
  createdAt: true,
}

export const createEventColumnVisibility = () => ({
  ...eventsDefaultColumnVisibility,
})
