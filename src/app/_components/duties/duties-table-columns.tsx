"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { Status, type DutyElement } from "@/types/api/duties"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { OperatorConsensusBreakdown } from "./cells/operator-consensus-breakdown"

export const dutiesTableColumns: ColumnDef<DutyElement>[] = [
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
    accessorKey: "operators",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end text-end"
        title="Operator Consensus Breakdown"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <OperatorConsensusBreakdown
          operators={row.original.operators}
          missingOperators={row.original.missing_operators}
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="justify-end text-end"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge
          className="capitalize"
          size="sm"
          variant={row.original.status === Status.Success ? "success" : "error"}
        >
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  // {
  //   accessorKey: "sequence",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Sequence" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.sequence}</div>,
  //   enableSorting: false,
  // },
]
