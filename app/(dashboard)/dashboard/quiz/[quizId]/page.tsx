import { Metadata } from "next"
import { redirect } from "next/navigation"
import { da } from "date-fns/locale"

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
        <QuizTypeCard
          detailQuizType={detailQuizTypeResp}
          detailQuizData={detailQuizDataResp}
        />
      </div>

      <div className="grid grid-flow-row gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deskripsi Kuis</CardTitle>
            <CardDescription>Deskripsi kuis dimuat disini</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {detailQuizDataResp.data.quiz_desc}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>{" "}
        <Card className="col-span-1 row-span-1 h-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Tanggal Pembuatan</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="default"
              disableNavigation
              className="rounded-md border justify-center items-center"
              numberOfMonths={2}
              selected={new Date(detailQuizDataResp.data.created_at)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
