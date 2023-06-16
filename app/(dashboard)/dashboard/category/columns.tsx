"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataCategory } from "@/types/category-res"

/**
 * Definition of columns for the DataCategory table.
 */
export const columns: ColumnDef<DataCategory>[] = [
  {
    accessorKey: "id_category",
    header: "ID Kategori",
  },
  {
    accessorKey: "category_name",
    header: "Nama Kategori",
  },
]
