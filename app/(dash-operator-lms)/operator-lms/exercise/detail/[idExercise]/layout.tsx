import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneExercise } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { QuizTab } from "@/components/pagers/quiz-tab"
import { DashboardShell } from "@/components/shell"

interface ExerciseDetailLayoutProps {
  children: React.ReactNode
  params: {
    idExercise: string
  }
}

export default async function ExerciseDetailLayout({
  children,
  params,
}: ExerciseDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const exercise = await getOneExercise({
    token: user?.token,
    idExercise: params.idExercise,
  })

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
            title: "Exercise",
          },
          {
            href: `/operator-lms/exercise/detail/${params.idExercise}`,
            title: exercise?.data?.quiz_title,
          },
        ]}
      />

      <div className="space-y-4 overflow-hidden">
        <QuizTab quizId={params.idExercise} />
        {children}
      </div>
    </DashboardShell>
  )
}
