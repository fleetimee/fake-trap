import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneQuiz } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { QuizAnnoucement } from "@/components/quiz-staging"

interface CourseQuizPageProps {
  params: {
    idApproval: string
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

export default async function CourseQuizPageProps({
  params,
}: CourseQuizPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    token: user?.token,
    id: params.idQuiz,
  })

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <QuizAnnoucement
      quizName={quiz?.data?.quiz_title}
      link={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/section/${params.idSection}/quiz/${params.idQuiz}/start`}
    />
  )
}
