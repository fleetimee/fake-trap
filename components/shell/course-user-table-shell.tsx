"use client"

import * as React from "react"
import { DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"

import { UserListResData } from "@/types/user/res"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table/"

interface CourseUserTableShellProps {
  data: UserListResData[]
  pageCount: number
  linkString?: string
}

export function CourseUserTableShell({
  data,
  pageCount,
  linkString = "",
}: CourseUserTableShellProps) {
  const columns = React.useMemo<ColumnDef<UserListResData, unknown>[]>(
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
      // columns={columns}
      // data={data}
      // pageCount={pageCount}
      // searchableColumns={[
      //   {
      //     id: "name",
      //     title: "Nama",
      //   },
      // ]}
      // newRowLink={linkString === "" ? undefined : linkString}

      dataTable={dataTable}
      columns={columns}
      newRowLink={linkString === "" ? undefined : linkString}
    />
  )
}
