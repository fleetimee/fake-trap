import { Metadata } from "next"
import { redirect } from "next/navigation"

import { QuizOneUserCountRes } from "@/types/quiz/res"
import { QuizOneRes } from "@/types/quiz/res/quiz-get-one"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getQuizById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import {
  QuizAnswerPromptCard,
  QuizTypeCard,
  QuizUserCountCard,
} from "@/components/app/quiz/detail/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface GetOneQuizUsersCountProps {
  id: string
  token: string | undefined
}

async function getOneQuizUsersCount({
  id,
  token,
}: GetOneQuizUsersCountProps): Promise<QuizOneUserCountRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${id}/users/count`,
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

interface GetQuizTypeProps {
  refCode: string
  token: string | undefined
}

async function getQuizType({
  token,
  refCode,
}: GetQuizTypeProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
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

export default async function QuizDetailPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailQuizData = getOneQuiz({
    id: params.quizId,
    token: user?.token,
  })

  const detailQuizUsersCount = getOneQuizUsersCount({
    id: params.quizId,
    token: user?.token,
  })

  const detailQuizType = getQuizType({
    refCode: "002",
    token: user?.token,
  })

  const [detailQuizDataResp, detailQuizUsersCountResp, detailQuizTypeResp] =
    await Promise.all([detailQuizData, detailQuizUsersCount, detailQuizType])

  const isAlreadyHaveQuiz = !!detailQuizDataResp.data.questions

  const quizUsersCount = detailQuizUsersCountResp.data.count

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <QuizAnswerPromptCard isAlreadyAnswered={isAlreadyHaveQuiz} />
        <QuizUserCountCard userCount={quizUsersCount} />
        <QuizTypeCard detailQuizType={detailQuizTypeResp} />
      </div>

      <div className="grid grid-flow-row grid-rows-3 gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="row-span-3 h-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deskripsi</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {detailQuizDataResp.data.quiz_desc}
            </p>
          </CardContent>
        </Card>
        <Card className="row-span-1 h-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tanggal Pembuatan
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {convertDatetoString(
                detailQuizDataResp.data.created_at.toString()
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="row-span-2 h-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Link and Connection
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {/* {detailSectionData.data.section_title} /{" "}
              {detailSectionData.data.course[0].course_name} */}

              {detailQuizDataResp.data.quiz_desc}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
