import { redirect } from "next/navigation"
import { Metadata } from "next/types"

import { authOptions } from "@/lib/auth"
import { getQuizById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { SoalShell } from "@/components/app/quiz/soal/add-question-shell"

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

export default async function HasilPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailQuizData = getQuizById({
    id: params.quizId,
    token: user?.token,
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SoalShell />
    </div>
  )
}
