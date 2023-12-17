import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { DiscordLogoIcon } from "@radix-ui/react-icons"

import { authOptions } from "@/lib/auth"
import { getListExerciseResult } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardShell, UserQuizResultTableShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Hasil Tes",
  description: "Hasil Tes",
}

interface ExerciseDetailHasilPageProps {
  params: {
    idExercise: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ExerciseDetailHasilPage({
  params,
  searchParams,
}: ExerciseDetailHasilPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const exerciseResult = await getListExerciseResult({
    token: user?.token,
    idExercise: params.idExercise,
    limit: limitInitial,
    page: pageInitial,
    sortBy: sortBy,
    orderBy: orderBy,
  })

  return (
    <DashboardShell>
      <Alert>
        <DiscordLogoIcon className="h-4 w-4" />
        <AlertTitle>Hasil Ujian</AlertTitle>
        <AlertDescription>
          Berikut adalah nilai dari semua percobaan quiz yang telah peserta
          lakukan
        </AlertDescription>
      </Alert>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <UserQuizResultTableShell
          data={exerciseResult.data}
          pageCount={exerciseResult.totalPage}
          linkString={`/operator-lms/exercise/detail`}
        />
      </Suspense>
    </DashboardShell>
  )
}
