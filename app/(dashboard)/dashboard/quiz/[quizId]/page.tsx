import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getQuizById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    quizId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getCurrentUser()

  const detailQuizData = await getQuizById({
    id: params.quizId,
    token: user?.token,
  })

  return {
    title: detailQuizData.data.quiz_title,
  }
}

export default async function QuizDetailPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailQuizData = await getQuizById({
    id: params.quizId,
    token: user?.token,
  })

  return <p>Penis</p>
}
