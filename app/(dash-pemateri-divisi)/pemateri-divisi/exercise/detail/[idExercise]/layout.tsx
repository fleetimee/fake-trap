import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneExercise } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { HeaderSubMenu } from "@/components/header-submenu"
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
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/exercise",
            title: "Test dan Latihan",
          },
          {
            href: `/pemateri-divisi/exercise/detail/${params.idExercise}`,
            title: exercise.data?.quiz_title,
          },
        ]}
      />

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HeaderSubMenu title={exercise?.data?.quiz_title} />
      </MotionDiv>

      <div className="space-y-4 overflow-hidden">
        <QuizTab
          quizId={params.idExercise}
          initialRoute={`/pemateri-divisi/exercise/detail/${params.idExercise}`}
        />
        {children}
      </div>
    </DashboardShell>
  )
}
