import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneQuiz } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { UserSubmittedAnswerFormProps } from "@/components/forms/user-submmited-answer-form"

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
    <UserSubmittedAnswerFormProps
      question={quiz?.data?.questions}
      quiz={quiz}
      baseUrl="/operator-lms/"
      isPreviewOnly
    />
  )
}
