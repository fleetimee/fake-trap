"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Category = {
  id_category: number
  category_name: string
}

export const CategoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryName",
    header: "Nama Kategori",
  },
]
