"use client"

import * as React from "react"
import Image from "next/image"
import { DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { UserListResData } from "@/types/user/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table/"

interface CourseUserTableShellProps {
  data: UserListResData[]
  pageCount: number
  linkString?: string
  idCourse?: string
  shouldExportable?: boolean
  totalCount?: number
}

export function CourseUserTableShell({
  data,
  pageCount,
  linkString = "",
  idCourse,
  shouldExportable = true,
  totalCount,
}: CourseUserTableShellProps) {
  const exportUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/course/${idCourse}/users/export`

  const columns = React.useMemo<ColumnDef<UserListResData, unknown>[]>(
    () => [
      {
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <div className="relative size-16 overflow-hidden rounded-full bg-white">
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
    ],
    []
  )

  const searchableColumns: DataTableSearchableColumn<UserListResData>[] = [
    {
      id: "name",
      title: "Nama",
    },
  ]

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
    searchableColumns,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      newRowLink={linkString === "" ? undefined : linkString}
      isExportable={shouldExportable}
      exportAction={exportUrl}
      totalCount={totalCount}
    />
  )
}
