import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getNewExerciseResult, getOneQuiz } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { QuizAnnoucement } from "@/components/quiz-staging"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card } from "@/components/ui/card"

interface CourseQuizPageProps {
  params: {
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

export default async function CourseQuizPageProps({
  params,
}: CourseQuizPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    token: user?.token,
    id: params.idQuiz,
  })

  const userQuiz = await getNewExerciseResult({
    token: user?.token,
    idUser: tokenExtracted.id,
    limit: 10,
    page: 1,
    idQuiz: params.idQuiz,
  })

  console.log(userQuiz)

  const isPretest = quiz.data.quiz_type === "0021"
  const isPosttest = quiz.data.quiz_type === "0022"

  if (isPretest && userQuiz.data.length > 0) {
    return (
      <p>
        Anda sudah mengerjakan pretest, silahkan lanjutkan ke materi selanjutnya
      </p>
    )
  }

  if (isPosttest && userQuiz.data.length === 3) {
    return (
      <p>
        Anda sudah mengerjakan posttest, silahkan lanjutkan ke materi
        selanjutnya
      </p>
    )
  }

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <QuizAnnoucement
      quizName={quiz?.data?.quiz_title}
      link={`/peserta/course/detail/${params.idCourse}/section/${params.idSection}/quiz/${params.idQuiz}/start`}
    />
  )
}
