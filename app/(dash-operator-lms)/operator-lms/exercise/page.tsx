import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorQuiz, getReference } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, QuizTableShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Test dan Latihan",
  description: "Test",
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

      <QuizTableShell
        data={quiz.data}
        pageCount={quiz.totalPage}
        referenceResp={references}
      />
    </DashboardShell>
  )
}
