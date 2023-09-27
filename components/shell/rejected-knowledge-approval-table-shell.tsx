"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import {
  ApprovalKnowledgeListResData,
  ApprovalListResData,
} from "@/types/approval/res/approval-list"
import { convertDatetoStringShort } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "../ui/badge"

interface RejectedKnowledgeApprovalTableShellProps {
  data: ApprovalKnowledgeListResData[]
  pageCount: number
}

export function RejectedKnowledgeApprovalTableShell({
  data,
  pageCount,
}: RejectedKnowledgeApprovalTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<
    ColumnDef<ApprovalKnowledgeListResData, unknown>[]
  >(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => row.id_approval_knowledge)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id_approval_knowledge]
                  : prev.filter(
                      (id) => id !== row.original.id_approval_knowledge
                    )
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "knowledge_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Pengetahuan" />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "user_request",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pengaju" />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Buat" />
        ),
        cell: ({ row }) => {
          return (
            <p>
              {convertDatetoStringShort(row.original.created_at.toString())}
            </p>
          )
        },
      },
      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Badge className="bg-red-500">{row.original.status_text}</Badge>
          )
        },
      },
      {
        accessorKey: "user_uuid_aprover",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Approver" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <p>
              {row.original.user_uuid_aprover
                ? row.original.user_approver
                : "-"}
            </p>
          )
        },
      },
      {
        accessorKey: "approved_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Reject" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <p>
              {row.original.approved_at
                ? convertDatetoStringShort(row.original.approved_at.toString())
                : "-"}
            </p>
          )
        },
      },
    ],
    [data]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "knowledge_title",
          title: "Nama Pengetahuan",
        },
      ]}
    />
  )
}
