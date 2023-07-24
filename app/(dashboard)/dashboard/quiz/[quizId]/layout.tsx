import React from "react"

import { QuizTab } from "@/components/pagers/quiz-tab"
import { DashboardShell } from "@/components/shell"

interface QuizDetailProps {
  children: React.ReactNode
  params: {
    quizId: string
  }
}

export default function QuizDetailLayout({
  children,
  params,
}: QuizDetailProps) {
  const quizId = params.quizId

  return (
    <DashboardShell>
      <div className="space-y-4 overflow-hidden">
        <div className="space-y-4 overflow-hidden">
          <QuizTab quizId={quizId} />
          {children}
        </div>
      </div>
    </DashboardShell>
  )
}
