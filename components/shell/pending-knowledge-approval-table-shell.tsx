"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { ApprovalKnowledgeListResData } from "@/types/approval/res/approval-list"
import { convertDatetoString, convertDatetoStringShort } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import PendingKnowledgeAction from "@/app/(dashboard-supervisor)/supervisor-area/approval/approve-knowledge/pending/_components/operations"

import { Badge } from "../ui/badge"

interface PendingKnowledgeApprovalTableShellProps {
  data: ApprovalKnowledgeListResData[]
  pageCount: number
}

export async function PendingKnowledgeApprovalTableShell({
  data,
  pageCount,
}: PendingKnowledgeApprovalTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<ApprovalKnowledgeListResData>[]>(
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
          <DataTableColumnHeader column={column} title="Judul Pengetahuan" />
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
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Badge className="bg-yellow-400">{row.original.status_text}</Badge>
          )
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Buat" />
        ),
        cell: ({ row }) => {
          return (
            <p>{convertDatetoString(row.original.created_at.toString())}</p>
          )
        },
      },
      {
        id: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        cell: ({ row }) => {
          return <PendingKnowledgeAction />
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
          title: "Judul Pengetahuan",
        },
      ]}
    />
  )
}
