"use client"

import React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { AuditTrailListResData } from "@/types/audit-trail/res/audit-trail-list"
import { convertDatetoString, parseUserAgent } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"

import { DataTable, DataTableColumnHeader } from "../data-table"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface AuditTrailTableShellProps {
  data: AuditTrailListResData[]
  pageCount: number
}

const sanitizeData = (data: any): any => {
  if (typeof data === "string") {
    // Escape single quotes and backslashes
    return data.replace(/\\/g, "\\\\").replace(/'/g, "\\'")
  } else if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item))
  } else if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeData(value)])
    )
  } else {
    return data
  }
}

export function AuditTrailTableShell({
  data,
  pageCount,
}: AuditTrailTableShellProps) {
  const columns = React.useMemo<ColumnDef<AuditTrailListResData, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => (
          <div className="w-8 truncate">
            {row.original.id.substring(0, 2)}...
          </div>
        ),
      },
      {
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative size-14 overflow-hidden rounded-full bg-white">
                  <Image
                    src={
                      user.profile_picture
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture}`
                        : `data:image/svg+xml;utf8,${generateFromString(user.nama)}`
                    }
                    alt="User name"
                    width={100}
                    height={100}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Image
                    src={
                      user.profile_picture
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture}`
                        : `data:image/svg+xml;utf8,${generateFromString(user.nama)}`
                    }
                    alt="User name"
                    width={700}
                    height={700}
                  />
                </div>
              </HoverCardContent>
            </HoverCard>
          )
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[200px]">
              {/* <Link
                href={`/dashboard/user/${row.original.uuid}`}
                className="text-sm font-bold text-blue-500 hover:underline"
              >
                <p>{row.original.name}</p>
              </Link> */}

              <p>{row.original.nama}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[150px]">
              <p>
                {convertDatetoString(row.original.date.toString()) ??
                  "Belum pernah disinkronkan"}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "timestamp",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waktu" />
        ),
      },
      {
        accessorKey: "method",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Method" />
        ),
        cell: ({ row }) => {
          // Determine the color and bold text based on the HTTP method
          const methodStyle =
            {
              GET: "text-green-500 font-bold",
              POST: "text-orange-500 font-bold",
              DELETE: "text-red-500 font-bold",
              PUT: "text-yellow-500 font-bold",
              PATCH: "text-blue-500 font-bold",
            }[row.original.method] || "text-black font-bold" // Default style if method is not matched

          return (
            <div>
              <p className={methodStyle}>{row.original.method}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "module",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modul" />
        ),
      },
      {
        accessorKey: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-[300px]">
              <p>{row.original.action}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "additional_info",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Informasi Tambahan" />
        ),
        cell: ({ row }) => {
          const sanitizedInfo = sanitizeData(row.original.additional_info)

          return (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Lihat
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px]">
                  <code
                    className="rounded-lg bg-gray-100 p-4 text-sm"
                    style={{ display: "block" }}
                  >
                    {JSON.stringify(sanitizedInfo, null, 2)}
                  </code>
                </PopoverContent>
              </Popover>
            </div>
          )
        },
      },
      {
        accessorKey: "user_agent",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User Agent" />
        ),
        cell: ({ row }) => {
          return (
            <div>
              <p>{parseUserAgent(row.original.user_agent)}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "ip_address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Alamat IP" />
        ),
      },
    ],
    []
  )

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
  })

  return <DataTable dataTable={dataTable} columns={columns} />
}
