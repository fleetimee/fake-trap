"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UserData } from "@/types/user-res"
import { convertDatetoString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UserOperations } from "@/components/app/course/detail/students/user-operations"
import { UserOperationsAdmin } from "@/components/app/user/user-operations"
import { Icons } from "@/components/icons"

export const columns: ColumnDef<UserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uuid",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const user = row.original

      return <>{convertDatetoString(user.created_at.toString())}</>
    },
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => {
      const user = row.original

      return (
        <>
          {user.last_login === null
            ? "-"
            : convertDatetoString(user.last_login.toString())}
        </>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return <UserOperationsAdmin user={user} />
    },
  },
]
