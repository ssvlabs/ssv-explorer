/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNowStrict } from "date-fns"

import { type AccountEvent } from "@/types/api/events"
import { toSentenceCase } from "@/lib/utils"
import { useLinks } from "@/hooks/use-links"
import { AccountEventIcon } from "@/components/ui/account-event-icon"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const eventsColumns = {
  event: {
    accessorKey: "event",
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
            className="group flex w-fit cursor-pointer items-center gap-2 rounded-lg p-2"
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
  createdAt: {
    accessorKey: "createdAt",
    title: "Age",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end text-end"
        title="Age"
      />
    ),
    cell: ({ row }) => (
      <Text variant="body-3-medium" className="text-end text-gray-600">
        {formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true })}
      </Text>
    ),
    enableSorting: true,
  },
} satisfies Record<string, ColumnDefWithTitle<AccountEvent>>

export const eventsTableColumns = [
  eventsColumns.event,
  eventsColumns.createdAt,
] satisfies ColumnDef<AccountEvent>[]

export const eventsDefaultColumnVisibility: Partial<
  Record<keyof typeof eventsColumns, boolean>
> = {
  event: true,
  createdAt: true,
}
