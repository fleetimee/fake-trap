"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListResData } from "@/types/category/res"
import { convertDatetoString } from "@/lib/utils"
import { CategoryOperations } from "@/components/app/category/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table/"
import { Checkbox } from "@/components/ui/checkbox"

interface CategoryTableShellProps {
  data: CategoryListResData[]
  pageCount: number
}

export function CategoryTableShell({
  data,
  pageCount,
}: CategoryTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<CategoryListResData, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => row.id_category)
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
                  ? [...prev, row.original.id_category]
                  : prev.filter((id) => id !== row.original.id_category)
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
        accessorKey: "id_category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "category_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Kategori" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={`/dashboard/category/${row.original.id_category}`}
              passHref
              className="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline"
            >
              <p className="text-sm font-bold">{row.original.category_name}</p>
            </Link>
          )
        },
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
      },
      {
        accessorKey: "image",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gambar" />
        ),
        cell: ({ row }) => (
          <Image
            src={row.original.image}
            alt={row.original.image}
            width={100}
            height={100}
            className="rounded-xl grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
          />
        ),
        enableSorting: false,
        enableHiding: false,
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
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        id: "actions",
        cell: ({ row }) => {
          const kategori = row.original

          return <CategoryOperations kategori={kategori} />
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
          id: "category_name",
          title: "Kategori",
        },
      ]}
    />
  )
}
