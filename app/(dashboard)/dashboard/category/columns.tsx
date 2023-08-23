"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CategoryListResData } from "@/types/category/res"
import { convertDatetoString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CategoryOperations } from "@/components/app/category/category-operations"
import { Icons } from "@/components/icons"

export const columns: ColumnDef<CategoryListResData>[] = [
  {
    accessorKey: "id_category",
    header: "ID Kategori",
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 "
        >
          Nama Kategori
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Dibuat pada",
    cell: ({ row }) => {
      convertDatetoString(row.original.created_at.toString())

      return <>{convertDatetoString(row.original.created_at.toString())}</>
    },
  },
  {
    accessorKey: "updated_at",
    header: "Diubah pada",
    cell: ({ row }) => {
      convertDatetoString(row.original.updated_at.toString())

      return <>{convertDatetoString(row.original.updated_at.toString())}</>
    },
  },
  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const kategori = row.original

      return <CategoryOperations kategori={kategori} />
    },
  },
]
