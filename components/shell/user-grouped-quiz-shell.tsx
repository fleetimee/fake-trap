"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { UserQuizGroupedResData } from "@/types/me/res"
import { ReferenceListRes } from "@/types/references/res"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"





interface UserQuizGroupedTableShellProps {
  data: UserQuizGroupedResData[]
  pageCount: number
  referenceResp: ReferenceListRes
}

export function UserQuizGroupedTableShell({
  data,
  pageCount,
  referenceResp,
}: UserQuizGroupedTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<UserQuizGroupedResData, unknown>[]>(
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
                  : data.map((row) => row.id_quiz)
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
                  ? [...prev, row.original.id_quiz]
                  : prev.filter((id) => id !== row.original.id_quiz)
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
        accessorKey: "id_quiz",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "quiz_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul" />
        ),
      },
      {
        accessorKey: "quiz_desc",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => {
          return (
            <>
              {row.original.quiz_desc.length > 50
                ? row.original.quiz_desc.substring(0, 50) + "..."
                : row.original.quiz_desc}
            </>
          )
        },
      },
      {
        accessorKey: "quiz_type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipe" />
        ),
        cell: ({ row }) => {
          return (
            <>
              <Badge className="text-center">{row.original.quiz_type}</Badge>
            </>
          )
        },
      },
      {
        accessorKey: "average_score",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Skor" />
        ),
        cell: ({ row }) => {
          return <p>{row.original.average_score.toFixed(2)}</p>
        },
      },
    ],
    [setSelectedRowIds, data]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "quiz_title",
          title: "Judul",
        },
      ]}
      filterableColumns={[
        {
          id: "quiz_type",
          title: "Filter Tipe Quiz",
          options: referenceResp.data.map((reference) => ({
            value: reference.code_ref2,
            label: reference.value_ref1,
          })),
        },
      ]}
    />
  )
}
