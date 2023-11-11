"use client"

import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { UserQuizTakenListResData } from "@/types/me/res"
import { ReferenceListRes } from "@/types/references/res"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface UserEnrolledCourseTableShellProps {
  data: UserQuizTakenListResData[]
  referenceResp: ReferenceListRes
  link?: string
  pageCount: number
}

export function UserRecentQuizTableShell({
  data,
  pageCount,
  referenceResp,
  link,
}: UserEnrolledCourseTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<UserQuizTakenListResData, unknown>[]>(
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
        accessorKey: "quiz_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={{
                pathname: link ? `${link}/${row.original.id_user_quiz}` : "#",
                query: { idQuiz: row.original.id_quiz },
              }}
            >
              <p className="cursor-pointer font-semibold text-blue-600 hover:underline">
                {row.original.quiz_title}
              </p>
            </Link>
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
        accessorKey: "score",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rata Rata Skor" />
        ),
      },
    ],
    []
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
