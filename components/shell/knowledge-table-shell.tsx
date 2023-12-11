"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { convertDatetoStringShort } from "@/lib/utils"
import { KnowledgeOperations } from "@/components/app/knowledge/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"

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
  const pathname = usePathname()

  const columns = React.useMemo<ColumnDef<KnowledgeListResData, unknown>[]>(
    () => [
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => {
          const knowledge = row.original

          return (
            <KnowledgeOperations
              knowledgeData={knowledge}
              categoryRes={categoryResp}
              referenceResp={referenceResp}
              updateRowLink={`${pathname}/update/${knowledge.id_knowledge}`}
              isApproval
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
          // <AspectRatio ratio={16 / 9}>
          <Link href={`${pathname}/detail/${row.original.id_knowledge}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.image}`}
              alt={row.original.knowledge_title}
              width={300}
              height={300}
              className="rounded-xl transition-all duration-300 ease-in-out "
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
          <div className="w-[300px] ">
            <Link
              href={`${pathname}/detail/${row.original.id_knowledge}`}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {row.original.knowledge_title}
            </Link>
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
        accessorKey: "user_approver",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supervisor" />
        ),
        cell: ({ row }) => {
          return (
            <>{row.original.user_approver ? row.original.user_approver : "-"}</>
          )
        },
      },
      {
        accessorKey: "user_request",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pengaju" />
        ),
        cell: ({ row }) => {
          return (
            <>{row.original.user_request ? row.original.user_request : "-"}</>
          )
        },
      },
    ],
    [categoryResp, pathname, referenceResp]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      filterableColumns={[
        {
          id: "id_category",
          title: "Filter Kategori",
          options: categoryResp.data.map((category) => ({
            label: category.category_name,
            value: category.id_category,
          })) as any,
        },
        {
          id: "status_text",
          title: "Filter Status",
          options: [
            {
              label: "Pending",
              value: "0051",
            },
            {
              label: "Approved",
              value: "0052",
            },
            {
              label: "Rejected",
              value: "0053",
            },
          ],
        },
        {
          id: "status",
          title: "Filter Visibility",
          options: referenceResp.data.map((reference) => ({
            label: reference.value_ref1,
            value: reference.code_ref2,
          })) as any,
        },
      ]}
      newRowLink={`${pathname}/new`}
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
