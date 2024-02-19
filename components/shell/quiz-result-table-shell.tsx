"use client"

import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { QuizUserAttemptListData } from "@/types/quiz/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

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
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <Avatar className="size-12 bg-white">
              <AvatarImage
                src={`data:image/svg+xml;utf8,${generateFromString(user.name)}`}
              />
              <AvatarFallback />
            </Avatar>
          )
        },
      },
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

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      isExportable
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${idQuiz}/getUserAttempt`}
    />
  )
}
