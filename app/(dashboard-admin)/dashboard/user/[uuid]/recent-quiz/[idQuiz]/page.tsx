import { redirect } from "next/navigation"

import {
  QuizOneRes,
  QuizQuestionListRes,
  QuizUserResultListRes,
} from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"





interface GetUserSelectedAnswer {
  token: string | undefined
  userQuizId: string
  userUuid: string
}

async function getUserSelectedAnswer({
  token,
  userUuid,
  userQuizId,
}: GetUserSelectedAnswer): Promise<QuizUserResultListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getSelectedAnswer/${userQuizId}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface GetQuizLessonProps {
  token: string | undefined
  quizId: string
}

async function getQuizLesson({
  token,
  quizId,
}: GetQuizLessonProps): Promise<QuizQuestionListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/getLesson`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneQuizProps {
  id: string
  token: string | undefined
}

async function getOneQuiz({ id, token }: GetOneQuizProps): Promise<QuizOneRes> {
  const quizOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await quizOne.json()
}

interface DetailRiwayatQuizProps {
  params: {
    idQuiz: string
    uuid: string
  }
}

export default async function DetailRiwayatQuiz({
  params,
}: DetailRiwayatQuizProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // const tokenExtract = extractToken(user?.token)

  const [quizOne, quizLesson, userSelectedAnswer] = await Promise.all([
    getOneQuiz({ id: params.idQuiz, token: user?.token }),
    getQuizLesson({ quizId: params.idQuiz, token: user?.token }),
    getUserSelectedAnswer({
      token: user?.token,
      userQuizId: params.idQuiz,
      userUuid: params.uuid,
    }),
  ])

  console.log(quizOne)

  return (
    <div>
      <p>Detail Riwayat Quiz</p>
      <p>idQuiz: {params.idQuiz}</p>
      <p>uuid: {params.uuid}</p>
    </div>
  )
}
