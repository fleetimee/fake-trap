"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
}

export function QuizTableShell({
  data,
  pageCount,
  referenceResp,
}: QuizTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const pathname = usePathname()

  const columns = React.useMemo<ColumnDef<QuizListResData, unknown>[]>(
    () => [
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),

        cell: ({ row }) => {
          const quiz = row.original

          return (
            <QuizOperations
              quiz={quiz}
              referenceResp={referenceResp}
              linkString={`${pathname}`}
            />
          )
        },
      },
      {
        accessorKey: "quiz_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul Tes" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[300px]">
              <Link
                href={`${pathname}/detail/${row.original.id_quiz}`}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                {row.original.quiz_title}
              </Link>
            </div>
          )
        },
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

          return (
            <div className="w-[200px]">
              {convertDatetoString(row.original.created_at.toString())}
            </div>
          )
        },
      },
      {
        accessorKey: "id_section",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Terhubung dengan Pelatihan?"
          />
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
    ],
    [pathname, referenceResp]
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
      newRowLink={`${pathname}/new`}
    />
  )
}
