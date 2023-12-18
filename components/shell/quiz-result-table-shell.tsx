"use client"

import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { QuizUserAttemptListData } from "@/types/quiz/res"
import { convertDatetoString } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"

interface UserQuizResultTableShellProps {
  data: QuizUserAttemptListData[]
  pageCount: number
  idQuiz: string
  linkString?: string
}

export function UserQuizResultTableShell({
  data,
  pageCount,
  idQuiz,
  linkString,
}: UserQuizResultTableShellProps) {
  const columns = React.useMemo<ColumnDef<QuizUserAttemptListData, unknown>[]>(
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
              <p className="font-semibold text-primary hover:underline">
                {row.original.score}
              </p>
            </Link>
          )
        },
      },
    ],
    [linkString]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      isExportable
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${idQuiz}/getUserAttempt`}
    />
  )
}
