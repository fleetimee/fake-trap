"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { UserListResData } from "@/types/user/res/user-list"
import { convertDatetoString, convertDatetoStringWithTime } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
import { UserOperationsAdmin } from "@/components/app/user/operations/"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

interface UserTableShellProps {
  data: UserListResData[]
  pageCount: number
  editRowLink?: string
}

export function UserTableShell({
  data,
  pageCount,
  editRowLink,
}: UserTableShellProps) {
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

          return <UserOperationsAdmin user={user} editRowLink={editRowLink} />
        },
      },
      {
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative size-14 overflow-hidden rounded-full bg-white">
                  <Image
                    src={
                      user.profile_picture
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture}`
                        : `data:image/svg+xml;utf8,${generateFromString(user.name)}`
                    }
                    alt="User name"
                    width={100}
                    height={100}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Image
                    src={
                      user.profile_picture
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture}`
                        : `data:image/svg+xml;utf8,${generateFromString(user.name)}`
                    }
                    alt="User name"
                    width={700}
                    height={700}
                  />
                </div>
              </HoverCardContent>
            </HoverCard>
          )
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
              {/* <Link
                href={`/dashboard/user/${row.original.uuid}`}
                className="text-sm font-bold text-blue-500 hover:underline"
              >
                <p>{row.original.name}</p>
              </Link> */}

              <p>{row.original.name}</p>
            </div>
          )
        },
      },
      // {
      //   accessorKey: "username",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Username" />
      //   ),
      //   // cell: ({ row }) => {
      //   //   return (
      //   //     <Link
      //   //       href={`/dashboard/user/${row.original.uuid}`}
      //   //       className="text-sm font-bold text-blue-500 hover:underline"
      //   //     >
      //   //       <p>{row.original.username}</p>
      //   //     </Link>
      //   //   )
      //   // },
      //   enableSorting: true,
      //   enableHiding: true,
      // },
      {
        accessorKey: "roles",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kewenangan" />
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

  const searchableColumns: DataTableSearchableColumn<UserListResData>[] = [
    {
      id: "name",
      title: "name",
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
      searchableColumns={searchableColumns}
      newRowLink={`${pathname}/new`}
      isExportable
      exportAction={`${process.env.NEXT_PUBLIC_BASE_URL}/users/xlsx`}
    />
  )
}
