"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListRes, CategoryListResData } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { convertDatetoString, convertDatetoStringShort } from "@/lib/utils"
import { KnowledgeOperations } from "@/components/app/knowledge/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface BadgeSwitchProps {
  approval: any
}

function badgeSwitch({ approval }: BadgeSwitchProps) {
  switch (approval.status_code) {
    case "0052":
      return <Badge className="bg-green-400">{approval.status_text}</Badge>
    case "0051":
      return <Badge className="bg-yellow-400">{approval.status_text}</Badge>
    case "0053":
      return <Badge className="bg-red-400">{approval.status_text}</Badge>
    default:
      return <Badge className="bg-orange-400">Draft</Badge>
  }
}

interface KnowledgeTableShellProps {
  data: KnowledgeListResData[]
  categoryResp: CategoryListRes
  referenceResp: ReferenceListRes
  pageCount: number
}

export function KnowledgeTableShell({
  data,
  categoryResp,
  referenceResp,
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
              className="rounded-xl grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
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
              categoryResp.data.find(
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
        size: 1000,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col ">
            <p className="line-clamp-2 text-sm">{row.original.description}</p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Visibility" />
        ),
        cell: ({ row }) => (
          <Badge className="text-center">
            {
              referenceResp.data.find(
                (reference) => reference.code_ref2 === row.original.status
              )?.value_ref1
            }
          </Badge>
        ),
      },
      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => badgeSwitch({ approval: row.original }),
        // cell: ({ row }) => (
        //   <Badge className="text-center">
        //     {
        //       referenceResp.data.find(
        //         (reference) => reference.code_ref2 === row.original.status_text
        //       )?.value_ref1
        //     }
        //   </Badge>
        // ),
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dibuat pada" />
        ),
        cell: ({ row }) => {
          convertDatetoStringShort(row.original.created_at.toString())

          return (
            <>{convertDatetoStringShort(row.original.created_at.toString())}</>
          )
        },
      },
      {
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Diubah pada" />
        ),
        cell: ({ row }) => {
          convertDatetoStringShort(row.original.updated_at.toString())

          return (
            <>{convertDatetoStringShort(row.original.updated_at.toString())}</>
          )
        },
      },
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        cell: ({ row }) => {
          const knowledge = row.original

          return (
            <KnowledgeOperations
              knowledgeData={knowledge}
              categoryRes={categoryResp}
              referenceResp={referenceResp}
            />
          )
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
          id: "knowledge_title",
          title: "Judul",
        },
      ]}
    />
  )
}
