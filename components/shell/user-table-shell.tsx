"use client"

import * as React from "react"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { UserListResData } from "@/types/user/res/user-list"
import { convertDatetoString } from "@/lib/utils"
import { UserOperationsAdmin } from "@/components/app/user/operations/"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"

interface UserTableShellProps {
  data: UserListResData[]
  pageCount: number
}

export function UserTableShell({ data, pageCount }: UserTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([])

  const columns = React.useMemo<ColumnDef<UserListResData, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.uuid)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.uuid]
                  : prev.filter((id) => id !== row.original.uuid)
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "username",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Usernam" />
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
            <p>
              {user.roles === "Pemateri"
                ? "Admin"
                : user.roles === "Admin"
                ? "Pemateri"
                : user.roles}
            </p>
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

          return <>{convertDatetoString(row.original.created_at.toString())}</>
        },
      },
      {
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Diubah pada" />
        ),
        cell: ({ row }) => {
          convertDatetoString(row.original.updated_at.toString())

          return <>{convertDatetoString(row.original.updated_at.toString())}</>
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
              <>{convertDatetoString(row.original.last_login.toString())}</>
            )
          }
        },
      },

      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        id: "actions",
        cell: ({ row }) => {
          const user = row.original

          return <UserOperationsAdmin user={user} />
        },
      },
    ],
    [data, setSelectedRowIds]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
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
