"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"

import { UserListResData } from "@/types/user/res/user-list"
import { convertDatetoString, convertDatetoStringWithTime } from "@/lib/utils"
import { UserOperationsAdmin } from "@/components/app/user/operations/"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"

interface UserTableShellProps {
  data: UserListResData[]
  pageCount: number
}

export function UserTableShell({ data, pageCount }: UserTableShellProps) {
  const pathname = usePathname()

  const columns = React.useMemo<ColumnDef<UserListResData, unknown>[]>(
    () => [
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        id: "action",
        cell: ({ row }) => {
          const user = row.original

          return <UserOperationsAdmin user={user} />
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[200px]">
              <Link
                href={`/dashboard/user/${row.original.uuid}`}
                className="text-sm font-bold text-blue-500 hover:underline"
              >
                <p>{row.original.name}</p>
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: "username",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={`/dashboard/user/${row.original.uuid}`}
              className="text-sm font-bold text-blue-500 hover:underline"
            >
              <p>{row.original.username}</p>
            </Link>
          )
        },
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "roles",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
          const user = row.original

          return (
            <div className="w-[200px]">
              <p>
                {user.roles === "Pemateri"
                  ? "Admin"
                  : user.roles === "Admin"
                  ? "Pemateri"
                  : user.roles}
              </p>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
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
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Diubah pada" />
        ),
        cell: ({ row }) => {
          convertDatetoString(row.original.updated_at.toString())

          return (
            <div className="w-[200px]">
              {convertDatetoString(row.original.updated_at.toString())}
            </div>
          )
        },
      },

      {
        accessorKey: "last_login",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Terakhir login" />
        ),
        cell: ({ row }) => {
          if (row.original.last_login === null) {
            return <>-</>
          } else {
            return (
              <div className="w-[200px]">
                {convertDatetoStringWithTime(
                  row.original.last_login.toString()
                )}
              </div>
            )
          }
        },
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      isExportable
      newRowLink={`${pathname}/new`}
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/users/xlsx`}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "username",
          title: "username",
        },
      ]}
    />
  )
}
