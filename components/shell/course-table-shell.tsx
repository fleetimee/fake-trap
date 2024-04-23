"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"

import { CourseListResData } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { convertDatetoString } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { CourseOperations } from "@/components/hamburger-operations/course-operations"
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

interface CourseTableShell {
  data: CourseListResData[]
  knowledgeResp: KnowledgeListRes
  pageCount: number
  isOperator?: boolean
}

export function CourseTableShell({
  data,
  knowledgeResp,
  pageCount,
  isOperator = true,
}: CourseTableShell) {
  const pathname = usePathname()
  const params = useSearchParams()

  const dateStart = params.get("from")
  const dateEnd = params.get("to")

  let exportUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/course/export`

  if (dateStart && dateEnd) {
    exportUrl += `?start_date=${encodeURIComponent(dateStart)}&end_date=${encodeURIComponent(dateEnd)}`
  }

  const columns = React.useMemo<ColumnDef<CourseListResData, unknown>[]>(
    () => [
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => {
          return isOperator ? (
            <CourseOperations
              courseResp={row.original}
              knowledgeResp={knowledgeResp}
            />
          ) : null
        },
      },
      {
        accessorKey: "image",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gambar" />
        ),
        cell: ({ row }) => (
          // <AspectRatio ratio={16 / 9}>
          <Link href={`/dashboard/course/${row.original.id_course}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${row.original.image}`}
              alt={row.original.course_name}
              width={300}
              height={300}
              className="rounded-xl duration-300 ease-in-out "
            />
          </Link>
          // </AspectRatio>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "course_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Pembelajaran" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex w-[200px] flex-col">
              <Link
                href={`${pathname}/detail/${row.original.id_course}`}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                {row.original.course_name}
              </Link>
            </div>
          )
        },
        enableResizing: true,
        size: 1000,
      },

      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => badgeSwitch({ approval: row.original }),
      },

      {
        accessorKey: "date_start",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Mulai" />
        ),
        cell: ({ row }) => {
          convertDatetoString(row.original.date_start.toString())

          return (
            <div className="w-[200px]">
              {
                convertDatetoString(
                  row.original.date_start.toString()
                ) as React.ReactNode
              }
            </div>
          )
        },
        size: 400,
      },
      {
        accessorKey: "date_end",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Selesai" />
        ),
        cell: ({ row }) => {
          convertDatetoString(row.original.date_end.toString())

          return (
            <div className="w-[200px]">
              {
                convertDatetoString(
                  row.original.date_end.toString()
                ) as React.ReactNode
              }
            </div>
          )
        },
        size: 400,
      },

      {
        id: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waktu" />
        ),
        cell: ({ row }) => {
          const status = [
            {
              id: 1,
              name: "Aktif",
            },
            {
              id: 2,
              name: "Berakhir",
            },
            {
              id: 3,
              name: "Soon",
            },
          ]

          const waktuMulai = new Date(row.original.date_start)
          const waktuSelesai = new Date(row.original.date_end)
          const waktuSekarang = new Date()

          if (waktuMulai <= waktuSekarang && waktuSekarang <= waktuSelesai) {
            return <Badge className="text-center">{status[0].name}</Badge>
          } else if (waktuSekarang > waktuSelesai) {
            return <Badge className="text-center">{status[1].name}</Badge>
          } else {
            return <Badge className="text-center">{status[2].name}</Badge>
          }
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const searchableColumns: DataTableSearchableColumn<CourseListResData>[] = [
    {
      id: "course_name",
      title: "Nama Pembelajaran",
    },
  ]

  const filterableColumns: DataTableFilterableColumn<CourseListResData>[] = [
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
      // columns={columns}
      // data={data}
      // filterableColumns={[
      //   {
      //     id: "status_text",
      //     title: "Filter Status",
      //     options: [
      //       {
      //         label: "Pending",
      //         value: "0051",
      //       },
      //       {
      //         label: "Approved",
      //         value: "0052",
      //       },
      //       {
      //         label: "Rejected",
      //         value: "0053",
      //       },
      //     ],
      //   },
      // ]}
      // newRowLink={`${pathname}/new`}
      // pageCount={pageCount}
      // searchableColumns={[
      //   {
      //     id: "course_name",
      //     title: "Nama Pembelajaran",
      //   },
      // ]}

      dataTable={dataTable}
      columns={columns}
      newRowLink={`${pathname}/new`}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      isExportable
      exportAction={exportUrl}
    />
  )
}
