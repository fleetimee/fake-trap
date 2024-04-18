"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { QuizUserAttemptListData } from "@/types/quiz/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"

interface UjianResultTableShellProps {
  data: QuizUserAttemptListData[]
  pageCount: number
  idQuiz: string
  linkString?: string
}

export function UjianResultTableShell({
  data,
  pageCount,
  idQuiz,
  linkString,
}: UjianResultTableShellProps) {
  const columns = React.useMemo<ColumnDef<QuizUserAttemptListData, unknown>[]>(
    () => [
      {
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <div className="relative size-20 overflow-hidden rounded-full bg-white">
              <Image
                src={
                  user.profile_picture
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture}`
                    : `data:image/svg+xml;utf8,${generateFromString(user.name)}`
                }
                alt="User name"
                width={200}
                height={200}
              />
            </div>
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
