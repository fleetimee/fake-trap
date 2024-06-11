"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"
import { useSession } from "next-auth/react"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { badgeSwitch } from "@/lib/badge-switch"
import {
  convertDatetoStringShort,
  convertDateToStringSimplified,
} from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { KnowledgeOperations } from "@/components/hamburger-operations/knowledge-operations"
import { Badge } from "@/components/ui/badge"

interface BadgeSwitchProps {
  approval: any
}

interface KnowledgeTableShellProps {
  data: KnowledgeListResData[]
  categoryResp: CategoryListRes
  referenceResp: ReferenceListRes
  pageCount: number
  canCreate?: boolean
}

export function KnowledgeTableShell({
  data,
  categoryResp,
  referenceResp,
  pageCount,
  canCreate,
}: KnowledgeTableShellProps) {
  const { data: session } = useSession()

  const isAdmin = session?.expires.role.some(
    (role) => role.role_name === "Admin" || role.role_name === "Operator LMS"
  )

  const pathname = usePathname()

  const searchParams = useSearchParams()

  // Get all search params
  const status = searchParams.get("status")
  const statusText = searchParams.get("status_text")
  const idCategory = searchParams.get("id_category")
  const page = searchParams.get("page")
  const perPage = searchParams.get("per_page")
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  const params = new URLSearchParams()

  if (status) {
    params.append("visibility", status)
  }

  if (statusText) {
    params.append("statusCodes", statusText)
  }

  if (idCategory) {
    params.append("categoryIds", idCategory)
  }

  if (page) {
    params.append("page", page.toString())
  }

  if (perPage) {
    params.append("per_page", perPage.toString())
  }

  if (from) {
    params.append("from", from)
  }

  if (to) {
    params.append("to", to)
  }

  const exportUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/knowledge/v2/export?${params.toString()}`

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
              isAdmin={isAdmin}
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
          <DataTableColumnHeader column={column} title="Modul" />
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
          <div className="w-[300px]">
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
          convertDateToStringSimplified(row.original.created_at.toString())

          return (
            <div className="w-[150px]">
              {convertDateToStringSimplified(
                row.original.created_at.toString()
              )}
            </div>
          )
        },
      },
      {
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Diubah pada" />
        ),
        cell: ({ row }) => {
          convertDateToStringSimplified(row.original.updated_at.toString())

          return (
            <div className="w-[150px]">
              {convertDateToStringSimplified(
                row.original.updated_at.toString()
              )}
            </div>
          )
        },
      },
      {
        accessorKey: "user_created_by",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dibuat oleh" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[150px]">
              {row.original.user_created_by
                ? row.original.user_created_by
                : "-"}
            </div>
          )
        },
      },
      {
        accessorKey: "user_updated_by",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Diubah oleh" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[150px]">
              {row.original.user_updated_by
                ? row.original.user_updated_by
                : "-"}
            </div>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const searchableColumns: DataTableSearchableColumn<KnowledgeListResData>[] = [
    {
      id: "knowledge_title",
      title: "Judul",
    },
  ]

  const filterableColumns: DataTableFilterableColumn<KnowledgeListResData>[] = [
    {
      id: "id_category",
      title: "Filter Modul",
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
  ]

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      newRowLink={`${pathname}/new`}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      exportAction={exportUrl}
      isExportable
      canCreate={canCreate}
    />
  )
}
