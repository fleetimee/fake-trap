"use client"

import React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { QuizLazyUserListResData } from "@/types/quiz/res/quiz-lazy-user"
import { useDataTable } from "@/hooks/use-data-table"

import { DataTable, DataTableColumnHeader } from "../data-table"

interface UjianLazyTableShellProps {
  data: QuizLazyUserListResData[]
  pageCount: number
  idExercise: string
  totalCount?: number
}

export function UjianLazyTableShell({
  data,
  pageCount,
  idExercise,
  totalCount,
}: UjianLazyTableShellProps) {
  const columns = React.useMemo<ColumnDef<QuizLazyUserListResData, unknown>[]>(
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
        accessorKey: "user_uuid",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="UUID" />
        ),
      },
    ],
    []
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
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/quizzes/${idExercise}/lazyuser/export`}
      totalCount={totalCount}
    />
  )
}
