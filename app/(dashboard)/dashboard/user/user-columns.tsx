"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UserData } from "@/types/user-res"

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "uuid",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
]
