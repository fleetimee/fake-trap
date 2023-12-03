import { redirect } from "next/navigation"

import {
  QuizOneRes,
  QuizQuestionListRes,
  QuizUserResultListRes,
} from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import { TypingEffect } from "@/components/typing-effect"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { PdfResult } from "./_pdf_content"


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

interface HasilUserQuizPageProps {
  params: {
    quizId: string
    id: string
  }
  searchParams: {
    user_uuid: string
  }
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

export default async function HasilUserQuizPage({
  params,
  searchParams,
}: HasilUserQuizPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getQuizResp = await getQuizLesson({
    token: user?.token,
    quizId: params.quizId,
  })

  const getUserSelectedAnswerResp = await getUserSelectedAnswer({
    token: user?.token,
    userUuid: searchParams.user_uuid,
    userQuizId: params.id,
  })

  const getOneQuizResp = await getOneQuiz({
    id: params.quizId,
    token: user?.token,
  })

  // count how many correct answer
  const countCorrectAnswer = getUserSelectedAnswerResp.data.filter(
    (item) => item.is_correct
  ).length

  // get total question
  const totalQuestion = getQuizResp.data.length

  return (
    <DashboardShell>
      <Card className="h-full min-h-[40rem]">
        <CardHeader>
          <TypingEffect
            textTyping={"Hasil Kuis - " + getOneQuizResp.data.quiz_title}
          />
          <div className="inline-flex items-center gap-4">
            <CardDescription className=" font-heading text-sm font-light">
              Score : {getUserSelectedAnswerResp.data[0].score}
            </CardDescription>
            |
            <CardDescription className="space-x-8 font-heading text-sm font-light">
              Jawaban benar {countCorrectAnswer} / {totalQuestion}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <PdfResult
            getOneQuiz={getOneQuizResp.data}
            getQuizLesson={getQuizResp.data}
            getUserSelectedAnswer={getUserSelectedAnswerResp.data}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
