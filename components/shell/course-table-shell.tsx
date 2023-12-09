"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"

import { CourseListResData } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { convertDatetoString, convertDatetoStringShort } from "@/lib/utils"
import { CourseOperations } from "@/components/app/course/operations/course-operations"
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

  const columns = React.useMemo<ColumnDef<CourseListResData, unknown>[]>(
    () => [
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
              className="rounded-xl grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
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
          <DataTableColumnHeader column={column} title="Nama Pelatihan" />
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
        accessorKey: "course_desc",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col ">
            <p className="line-clamp-2 text-sm">{row.original.course_desc}</p>
          </div>
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
        accessorKey: "knowledge_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pengetahuan" />
        ),
        cell: ({ row }) => (
          <div className="w-[300px]">
            <p className="text-sm">
              {row.original.knowledge_title as React.ReactNode}
            </p>
          </div>
        ),
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
      {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
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
    ],
    [data, isOperator, knowledgeResp, pathname]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      filterableColumns={[
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
      ]}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "course_name",
          title: "Nama Pelatihan",
        },
      ]}
    />
  )
}
