import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getQuizCreatedByUser,
  getQuizDashboardCount,
} from "@/lib/fetcher/exercise-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, QuizTableShell } from "@/components/shell"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Test dan Latihan",
  description: "Test",
}

interface PemateriExercisePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PemateriDivisiExercisePage({
  searchParams,
}: PemateriExercisePageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, quiz_title, quiz_type } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "id_quiz"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial = typeof quiz_title === "string" ? quiz_title : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const [quiz, reference, count] = await Promise.all([
    getQuizCreatedByUser({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      sortBy: sortField,
      orderBy: sortOrder,
      searchQuery: searchQueryInitial,
      quizTypes: quiz_type,
      createdBy: tokenExtracted?.id,
    }),
    getReference({
      token: user?.token,
      refCode: "002",
    }),
    getQuizDashboardCount({
      token: user?.token,
      idUser: tokenExtracted?.id,
    }),
  ])

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/exercise",
            title: "Test dan Latihan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Test dan Latihan"
            description="Buat Pre Test, Post Test, dan Latihan untuk peserta Anda."
          />
        </MotionDiv>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Widget
          icon={<Icons.quiz className="text-blue-500" />}
          title="Total"
          subtitle={count.data.total_quiz_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-green-500" />}
          title="Pre Test"
          subtitle={count.data.pretest_quiz_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-yellow-500" />}
          title="Post Test"
          subtitle={count.data.posttest_quiz_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-red-500" />}
          title="Terbaru"
          subtitle={count.data.recent_quiz.toString()}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <QuizTableShell
          data={quiz.data}
          pageCount={quiz.totalPage ?? 0}
          referenceResp={reference}
        />
      </Suspense>
    </DashboardShell>
  )
}
