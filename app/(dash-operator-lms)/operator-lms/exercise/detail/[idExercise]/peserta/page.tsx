import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { PersonIcon } from "@radix-ui/react-icons"

import { authOptions } from "@/lib/auth"
import { getQuizMembers } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardShell, UjianPesertaTableShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Peserta Ujian",
  description: "Peserta Ujian",
}

interface ExerciseDetailPesertaPageProps {
  params: {
    idExercise: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ExerciseDetailPesertaPage({
  params,
  searchParams,
}: ExerciseDetailPesertaPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "attemps"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const exerciseMember = await getQuizMembers({
    token: user?.token,
    idExercise: params.idExercise,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortBy,
    orderBy: orderBy,
  })

  return (
    <DashboardShell>
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Alert>
          <PersonIcon className="size-4" />
          <AlertTitle>List Peserta</AlertTitle>
          <AlertDescription>
            Berikut adalah list peserta yang sudah mengerjakan ujian ini
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <UjianPesertaTableShell
          data={exerciseMember.data}
          pageCount={exerciseMember.totalPage}
          idExercise={params.idExercise}
          totalCount={exerciseMember.count}
        />
      </Suspense>
    </DashboardShell>
  )
}
