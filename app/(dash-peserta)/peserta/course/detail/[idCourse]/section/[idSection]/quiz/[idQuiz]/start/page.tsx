import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { QuizType } from "@/lib/enums/status"
import { getOneQuiz, getUserQuizResults } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    token: user?.token,
    id: params.idQuiz,
  })

  const userQuiz = await getUserQuizResults({
    token: user?.token,
    idUser: tokenExtracted.id,
    limit: 10,
    page: 1,
    idQuiz: params.idQuiz,
  })

  const isPretest = quiz.data.quiz_type === QuizType.PRETEST
  const isPosttest = quiz.data.quiz_type === QuizType.POSTTEST

  const isPretestExceded = userQuiz.data.length > 0 && isPretest
  const isPosttestExceded = userQuiz.data.length === 3 && isPosttest

  if (isPretestExceded || isPosttestExceded) {
    redirect(
      `/peserta/course/detail/${params.idCourse}/section/${params.idSection}/quiz/${params.idQuiz}`
    )
  }

  return (
    <UserSubmittedAnswerForm
      question={quiz?.data?.questions}
      quiz={quiz}
      baseUrl="/peserta/"
    />
  )
}
