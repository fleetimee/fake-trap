"use client"

import React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { UjianPesertaListResData } from "@/types/quiz/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"

interface UjianPesertaTableShellProps {
  data: UjianPesertaListResData[]
  pageCount: number
  idExercise: string
  totalCount?: number
}

export function UjianPesertaTableShell({
  data,
  pageCount,
  idExercise,
  totalCount,
}: UjianPesertaTableShellProps) {
  // const [isPending, startTransition] = React.useTransition()
  // const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<UjianPesertaListResData, unknown>[]>(
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
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/quizzes/${idExercise}/members/export`}
      totalCount={totalCount}
    />
  )
}
