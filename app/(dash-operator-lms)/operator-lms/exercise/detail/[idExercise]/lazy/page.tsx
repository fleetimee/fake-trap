import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getQuizLazyUser } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardShell } from "@/components/shell"
import { UjianLazyTableShell } from "@/components/shell/ujian-lazy-table-shell"

export const metadata: Metadata = {
  title: "Belum Mengerjakan",
  description: "Belum Mengerjakan",
}

interface ExerciseDetailLazyQuizMemberPageProps {
  params: {
    idExercise: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function LazyQuizMemberPage({
  params,
  searchParams,
}: ExerciseDetailLazyQuizMemberPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "asc"
  const sortByInitial = typeof sort === "string" ? sort : "name"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const lazyUsers = await getQuizLazyUser({
    idExercise: params.idExercise,
    limit: limitInitial,
    page: pageInitial,
    sortBy: sortBy,
    orderBy: orderBy,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <Suspense fallback={<DataTableSkeleton columnCount={10} />} />
      <UjianLazyTableShell
        data={lazyUsers?.data}
        idExercise={params.idExercise}
        pageCount={lazyUsers.totalPage}
        totalCount={lazyUsers.count}
      />
    </DashboardShell>
  )
}
