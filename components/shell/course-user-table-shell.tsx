"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { UserListResData } from "@/types/user/res"
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
    [data]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "name",
          title: "Nama",
        },
      ]}
      newRowLink={linkString === "" ? undefined : linkString}
    />
  )
}
