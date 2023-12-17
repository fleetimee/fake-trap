"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { QuizMemberListResData } from "@/types/quiz/res"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"





interface QuizMemberTableShellProps {
  data: QuizMemberListResData[]
  pageCount: number
}

export function QuizMemberTableShell({
  data,
  pageCount,
}: QuizMemberTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<QuizMemberListResData, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama" />
        ),
      },
      {
        accessorKey: "username",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
        ),
      },
      {
        accessorKey: "user_uuid",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="UUID" />
        ),
      },
      {
        accessorKey: "attemps",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Percobaan" />
        ),
        cell: ({ row }) => <Badge>{row.original.attemps} Kali</Badge>,
      },
    ],
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
