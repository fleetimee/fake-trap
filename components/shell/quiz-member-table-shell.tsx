"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { QuizMemberListResData } from "@/types/quiz/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface QuizMemberTableShellProps {
  data: QuizMemberListResData[]
  pageCount: number
  idExercise: string
}

export function QuizMemberTableShell({
  data,
  pageCount,
  idExercise,
}: QuizMemberTableShellProps) {
  // const [isPending, startTransition] = React.useTransition()
  // const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<QuizMemberListResData, unknown>[]>(
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
        accessorKey: "attemps",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Percobaan" />
        ),
        cell: ({ row }) => <Badge>{row.original.attemps} Kali</Badge>,
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
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${idExercise}/getQuizMember`}
    />
  )
}
