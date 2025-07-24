"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNowStrict } from "date-fns"

import { type AccountEvent } from "@/types/api/events"
import { toSentenceCase } from "@/lib/utils"
import { AccountEventIcon } from "@/components/ui/account-event-icon"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import type { ColumnDefWithTitle } from "../utils/column-titles"

export const eventsColumns = {
  event: {
    accessorKey: "event",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    cell: ({ row }) => (
      <div className="flex w-4 items-center gap-2">
        <AccountEventIcon event={row.original.event} />
        <Text>{toSentenceCase(row.original.event)}</Text>
      </div>
    ),
    enableSorting: false,
  },
  createdAt: {
    accessorKey: "createdAt",
    title: "Age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="text-end" title="Age" />
    ),
    cell: ({ row }) => (
      <Text variant="body-3-medium" className="text-end text-gray-600">
        {formatDistanceToNowStrict(row.original.createdAt, { addSuffix: true })}
      </Text>
    ),
    enableSorting: false,
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
