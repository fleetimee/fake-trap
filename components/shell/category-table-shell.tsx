"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListResData } from "@/types/category/res"
import { RuleOneResData } from "@/types/rule/res"
import { convertDatetoString } from "@/lib/utils"
import { CategoryOperations } from "@/components/app/category/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table/"
import { Checkbox } from "@/components/ui/checkbox"

import { AspectRatio } from "../ui/aspect-ratio"

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
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<CategoryListResData, unknown>[]>(
    () => [
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

          return (
            <CategoryOperations
              kategori={kategori}
              rule={rule}
              editRowLink={editRowLink}
            />
          )
        },
      },
    ],
    [data, editRowLink, rule]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      newRowLink={newRowLink ? newRowLink : undefined}
      searchableColumns={[
        {
          id: "category_name",
          title: "Kategori",
        },
      ]}
    />
  )
}
