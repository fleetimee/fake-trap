import { Metadata } from "next"
import { redirect } from "next/navigation"

import { QuizLinkedList, QuizOneUserCountRes } from "@/types/quiz/res"
import { QuizOneRes } from "@/types/quiz/res/quiz-get-one"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getQuizById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import {
  QuizAnswerPromptCard,
  QuizCalendarCard,
  QuizDescriptionCard,
  QuizLinkedCard,
  QuizTypeCard,
  QuizUserCountCard,
} from "@/components/app/quiz/detail/ui"

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

interface GetLinkedCourseProps {
  token: string | undefined
  quizId: string
}

async function getLinkedCourse({
  token,
  quizId,
}: GetLinkedCourseProps): Promise<QuizLinkedList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/linked-course`,
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

  const linkedCourse = getLinkedCourse({
    token: user?.token,
    quizId: params.quizId,
  })

  const [
    detailQuizDataResp,
    detailQuizUsersCountResp,
    detailQuizTypeResp,
    linkedCourseResp,
  ] = await Promise.all([
    detailQuizData,
    detailQuizUsersCount,
    detailQuizType,
    linkedCourse,
  ])

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

      <div className="grid grid-cols-1">
        <QuizLinkedCard
          code={linkedCourseResp.code}
          data={linkedCourseResp.data}
        />
      </div>

      <div className="grid grid-flow-row gap-4 md:grid-cols-1 lg:grid-cols-2">
        <QuizDescriptionCard data={detailQuizDataResp.data} />
        <QuizCalendarCard data={detailQuizDataResp.data} />
      </div>
    </div>
  )
}
