"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataCategory } from "@/types/category-res"
import { Button } from "@/components/ui/button"
import { CategoryOperations } from "@/components/app/category/category-operations"
import { Icons } from "@/components/icons"

export const columns: ColumnDef<DataCategory>[] = [
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
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const kategori = row.original

      return <CategoryOperations kategori={kategori} />
    },
  },
]
