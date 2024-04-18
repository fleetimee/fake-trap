import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getQuizLeaderboard } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardShell } from "@/components/shell"
import { UjianLeaderboardTableShell } from "@/components/shell/ujian-leaderboard-table-shell"

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Leaderboard",
}

interface ExerciseDetailLeaderboardPageProps {
  params: {
    idExercise: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ExerciseDetailLeaderboardPage({
  params,
  searchParams,
}: ExerciseDetailLeaderboardPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "position"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const leaderboard = await getQuizLeaderboard({
    idExercise: params.idExercise,
    limit: limitInitial,
    page: pageInitial,
    sortBy: sortBy,
    orderBy: orderBy,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <UjianLeaderboardTableShell
          data={leaderboard?.data}
          pageCount={leaderboard.totalPage}
          idExercise={params.idExercise}
        />
      </Suspense>
    </DashboardShell>
  )
}
