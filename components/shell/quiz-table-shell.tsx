"use client"

import * as React from "react"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { QuizListResData } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { convertDatetoString } from "@/lib/utils"
import { QuizOperations } from "@/components/app/quiz/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"





interface QuizTableShellProps {
  data: QuizListResData[]
  referenceResp: ReferenceListRes
  pageCount: number
  link?: string
}

export function QuizTableShell({
  data,
  pageCount,
  referenceResp,
  link,
}: QuizTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<QuizListResData, unknown>[]>(
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
          <DataTableColumnHeader column={column} title="Judul Kuis" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <Link
                href={
                  link
                    ? `${link}/${row.original.id_quiz}`
                    : `/operator-lms/exercise/detail/${row.original.id_quiz}`
                }
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                {row.original.quiz_title}
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: "quiz_desc",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deskripsi Kuis" />
        ),
      },
      {
        accessorKey: "quiz_type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipe Kuis" />
        ),
        cell: ({ row }) => (
          <Badge className="text-center">
            {
              referenceResp.data.find(
                (reference) => reference.code_ref2 === row.original.quiz_type
              )?.value_ref1
            }
          </Badge>
        ),
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dibuat pada" />
        ),
        cell: ({ row }) => {
          convertDatetoString(row.original.created_at.toString())

          return <>{convertDatetoString(row.original.created_at.toString())}</>
        },
      },
      {
        accessorKey: "id_section",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Terhubung ?" />
        ),
        cell: ({ row }) => {
          return (
            <Badge
              className="items-center justify-center text-center"
              variant="outline"
            >
              {row.original.id_section ? "Ya" : "Tidak"}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),

        cell: ({ row }) => {
          const quiz = row.original

          return <QuizOperations quiz={quiz} referenceResp={referenceResp} />
        },
      },
    ],
    [data, setSelectedRowIds]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "quiz_type",
          title: "Tipe Kuis",
          options: referenceResp.data.map((reference) => ({
            value: reference.code_ref2,
            label: reference.value_ref1,
          })),
        },
      ]}
      searchableColumns={[
        {
          id: "quiz_title",
          title: "Judul Kuis",
        },
      ]}
    />
  )
}
