import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getAllQuizData } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./quiz-columns"
import { QuizDataTable } from "./quiz-data-table"

export const metadata = {
  title: "Quiz",
  description: "Quiz yang tersedia di e-learning",
}

export default async function QuizPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quizList = await getAllQuizData({
    token: user?.token,
  })

  console.log(quizList)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Quiz"
        description="Quiz yang tersedia di e-learning"
      />
      <QuizDataTable columns={columns} data={quizList.data} />
    </DashboardShell>
  )
}
