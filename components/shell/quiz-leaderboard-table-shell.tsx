"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { generateFromString } from "generate-avatar"

import { QuizLeaderboardListResData } from "@/types/quiz/res/quiz-leaderboard-list"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface QuizLeaderboardTableShellProps {
  data: QuizLeaderboardListResData[]
  pageCount: number
  idExercise: string
}

export function QuizLeaderboardTableShell({
  data,
  pageCount,
  idExercise,
}: QuizLeaderboardTableShellProps) {
  const columns = React.useMemo<
    ColumnDef<QuizLeaderboardListResData, unknown>[]
  >(
    () => [
      {
        accessorKey: "position",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Posisi" />
        ),
        cell: ({ row }) => {
          const user = row.original
          const position = user.position
          let suffix = ""
          if (position % 10 === 1 && position % 100 !== 11) {
            suffix = "st"
          } else if (position % 10 === 2 && position % 100 !== 12) {
            suffix = "nd"
          } else if (position % 10 === 3 && position % 100 !== 13) {
            suffix = "rd"
          } else {
            suffix = "th"
          }
          return (
            <span>
              {position}
              {suffix}
            </span>
          )
        },
      },
      {
        id: "avatar",
        cell: ({ row }) => {
          const user = row.original

          return (
            <Avatar className="size-12 bg-white">
              <AvatarImage
                src={`data:image/svg+xml;utf8,${generateFromString(user.name)}`}
              />
              <AvatarFallback />
            </Avatar>
          )
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama" />
        ),
      },
      {
        accessorKey: "score",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Score" />
        ),
      },
      {
        accessorKey: "time_elapsed",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waktu" />
        ),
      },
    ],
    []
  )

  const { dataTable } = useDataTable({
    columns,
    data,
    pageCount,
  })

  return <DataTable dataTable={dataTable} columns={columns} />
}
