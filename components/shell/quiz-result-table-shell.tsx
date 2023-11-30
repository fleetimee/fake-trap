"use client"

import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { QuizUserAttemptListData } from "@/types/quiz/res"
import { convertDatetoString } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"

interface UserQuizResultTableShellProps {
  data: QuizUserAttemptListData[]
  pageCount: number
  linkString?: string
}

export function UserQuizResultTableShell({
  data,
  pageCount,
  linkString,
}: UserQuizResultTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<QuizUserAttemptListData, unknown>[]>(
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
                  : data.map((row) => row.id_user_quiz)
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
                  ? [...prev, row.original.id_user_quiz]
                  : prev.filter((id) => id !== row.original.id_user_quiz)
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
        accessorKey: "id_user_quiz",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
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
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waktu" />
        ),
        cell: ({ row }) =>
          convertDatetoString(row.original.created_at.toString()),
      },
      {
        accessorKey: "score",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Skor" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={
                linkString
                  ? `${linkString}/${row.original.id_quiz}/hasil/${row.original.user_uuid}?idAttempt=${row.original.id_user_quiz}`
                  : "#"
              }
            >
              <p className="text-primary hover:underline">
                {row.original.score}
              </p>
            </Link>
          )
        },
      },
    ],
    [setSelectedRowIds, data]
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
