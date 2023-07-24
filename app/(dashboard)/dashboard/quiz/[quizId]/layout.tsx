import React from "react"

import { getQuizById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { HeaderSubMenu } from "@/components/header-submenu"
import { QuizTab } from "@/components/pagers/quiz-tab"
import { DashboardShell } from "@/components/shell"

interface QuizDetailProps {
  children: React.ReactNode
  params: {
    quizId: string
  }
}

export default async function QuizDetailLayout({
  children,
  params,
}: QuizDetailProps) {
  const user = await getCurrentUser()

  const quizId = params.quizId

  const dataDetailQuiz = await getQuizById({
    id: quizId,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <HeaderSubMenu title={dataDetailQuiz.data.quiz_title} />
      <div className="space-y-4 overflow-hidden">
        <QuizTab quizId={quizId} />
        {children}
      </div>
    </DashboardShell>
  )
}
