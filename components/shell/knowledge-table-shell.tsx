"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListResData } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { convertDatetoString } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface KnowledgeTableShellProps {
  data: KnowledgeListResData[]
  categoryResp: CategoryListResData[]
  pageCount: number
}

enum Status {
  PUBLIC = 1,
  PRIVATE = 0,
}

export function KnowledgeTableShell({
  data,
  categoryResp,
  pageCount,
}: KnowledgeTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<KnowledgeListResData, unknown>[]>(
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
                  : data.map((row) => row.id_knowledge)
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
                  ? [...prev, row.original.id_knowledge]
                  : prev.filter((id) => id !== row.original.id_knowledge)
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
        accessorKey: "id_knowledge",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "image",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gambar" />
        ),
        cell: ({ row }) => (
          // <AspectRatio ratio={16 / 9}>
          <Link href={`/dashboard/knowledge/${row.original.id_knowledge}`}>
            <Image
              src={row.original.image}
              alt={row.original.knowledge_title}
              width={300}
              height={300}
              className="rounded-xl grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
            />
          </Link>
          // </AspectRatio>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id_category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori" />
        ),
        cell: ({ row }) => (
          <Badge variant="secondary">
            {
              categoryResp.find(
                (category) => category.id_category === row.original.id_category
              )?.category_name
            }
          </Badge>
        ),
      },
      {
        accessorKey: "knowledge_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col ">
            <Link
              href={`/dashboard/knowledge/${row.original.id_knowledge}`}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {row.original.knowledge_title}
            </Link>
          </div>
        ),
        size: 700,
        minSize: 300,
        maxSize: 1000,
        enableResizing: true,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col ">
            <p className="text-sm line-clamp-2">{row.original.description}</p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <Badge className="text-center">
            {row.original.status === Status.PUBLIC ? "Publik" : "Privat"}
          </Badge>
        ),
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
      },
    ],
    [data, setSelectedRowIds]
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
