"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { Status, type DutyElement } from "@/types/api/duties"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

export const dutiesTableColumns: ColumnDef<DutyElement>[] = [
  //   {
  //     accessorKey: "publicKey",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Validator Public Key" />
  //     ),
  //     cell: ({ row }) => (
  //       <div className="flex items-center gap-1">
  //         <Text className="font-mono text-primary-500">
  //           <div>{shortenAddress(remove0x(row.original.publicKey))}</div>
  //         </Text>
  //         <CopyBtn className="text-gray-500" text={row.original.publicKey} />
  //       </div>
  //     ),
  //     enableSorting: false,
  //   },

  {
    accessorKey: "epoch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Epoch" />
    ),
    cell: ({ row }) => <div>{row.original.epoch}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "slot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slot" />
    ),
    cell: ({ row }) => <div>{row.original.slot}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "duty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duty" />
    ),
    cell: ({ row }) => <div>{row.original.duty}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={
          row.original.status === Status.Success
            ? "text-green-500"
            : "text-red-500"
        }
      >
        {row.original.status}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "sequence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sequence" />
    ),
    cell: ({ row }) => <div>{row.original.sequence}</div>,
    enableSorting: false,
  },
]
