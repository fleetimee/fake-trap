import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneQuiz } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { UserSubmittedAnswerForm } from "@/components/forms/user-submmited-answer-form"

interface CourseQuizStartPageProps {
  params: {
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

export default async function CourseQuizStartPage({
  params,
}: CourseQuizStartPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    token: user?.token,
    id: params.idQuiz,
  })

  return (
    <UserSubmittedAnswerForm
      question={quiz?.data?.questions}
      quiz={quiz}
      baseUrl="/supervisor-lms/"
      isPreviewOnly
      params={params}
    />
  )
}
