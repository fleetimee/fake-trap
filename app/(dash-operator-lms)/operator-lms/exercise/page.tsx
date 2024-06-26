import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorQuiz } from "@/lib/fetcher/exercise-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, QuizTableShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Ujian",
  description: "Ujian",
}

interface OperatorLMSExercisePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSExercisePage({
  searchParams,
}: OperatorLMSExercisePageProps) {
  const user = await getCurrentUser()

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

  const [quiz, references] = await Promise.all([
    getOperatorQuiz({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      sortBy: sortField,
      orderBy: sortOrder,
      searchQuery: searchQueryInitial,
      quizTypes: quiz_type,
    }),
    getReference({
      refCode: "002",
      token: user?.token,
    }),
  ])

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/exercise",
            title: "Ujian",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Ujian"
            description="Kelola ujian yang ada di sistem"
          />
        </MotionDiv>
      </div>

      <QuizTableShell
        data={quiz.data}
        pageCount={quiz.totalPage}
        referenceResp={references}
      />
    </DashboardShell>
  )
}
