"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListResData } from "@/types/category/res"
import { RuleOneResData } from "@/types/rule/res"
import { convertDatetoString } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table/"
import { CategoryOperations } from "@/components/hamburger-operations/category-operations"

interface CategoryTableShellProps {
  data: CategoryListResData[]
  pageCount: number
  rule: RuleOneResData
  newRowLink?: string
  editRowLink?: string
}

export function CategoryTableShell({
  data,
  pageCount,
  rule,
  newRowLink,
  editRowLink,
}: CategoryTableShellProps) {
  const columns = React.useMemo<ColumnDef<CategoryListResData, unknown>[]>(
    () => [
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        id: "actions",
        cell: ({ row }) => {
          const kategori = row.original

          return (
            <CategoryOperations
              kategori={kategori}
              rule={rule}
              editRowLink={editRowLink}
            />
          )
        },
      },
      {
        accessorKey: "image",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gambar" />
        ),
        cell: ({ row }) => (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.image}`}
            alt={row.original.image}
            width={50}
            height={50}
            className="rounded-xl  transition-all duration-300 ease-in-out "
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "category_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Modul" />
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "total_knowledge",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total Pengetahuan" />
        ),
        cell: ({ row }) => {
          return (
            <p className="text-sm font-bold">{row.original.total_knowledge}</p>
          )
        },
        enableSorting: false,
        enableHiding: true,
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
        enableSorting: true,
        enableHiding: true,
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
        enablesorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "created_by",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dibuat oleh" />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const searchableColumns: DataTableSearchableColumn<CategoryListResData>[] = [
    {
      id: "category_name",
      title: "Cari Modul",
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
      // columns={columns}
      // data={data}
      // pageCount={pageCount}
      // newRowLink={newRowLink ? newRowLink : undefined}
      // searchableColumns={[
      //   {
      //     id: "category_name",
      //     title: "Kategori",
      //   },
      // ]}

      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      newRowLink={newRowLink ? newRowLink : undefined}
    />
  )
}
