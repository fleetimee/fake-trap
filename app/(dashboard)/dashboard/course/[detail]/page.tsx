import * as console from "console"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { QuestionListRes } from "@/types/question/question-list"
import { QuizListRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { ThreadListRes } from "@/types/threads/res/thread-list"
import { UserListRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CourseDetailShell } from "@/components/app/course/detail/ui"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    detail: string
  }
  searchParams: {
    [key: string]: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getCurrentUser()

  const detailCourseData = await getOneCourse({
    token: user?.token,
    idCourse: params.detail,
  })

  return {
    title: detailCourseData.data.course_name,
  }
}

interface GetContentTypeProps {
  token: string | undefined
  refCode: string
}

async function getContentType({
  token,
  refCode,
}: GetContentTypeProps): Promise<ReferenceListRes> {
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

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUsersListProps {
  token: string | undefined
  limit: number
  page: number
}

async function getUsersList({
  token,
  limit,
  page,
}: GetUsersListProps): Promise<UserListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetQuizListWithNullSectionProps {
  token: string | undefined
  isNull: boolean
}

async function getQuizListWithNullSection({
  token,
  isNull,
}: GetQuizListWithNullSectionProps): Promise<QuizListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz?isNullSection=${isNull}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneKnowledgeProps {
  token: string | undefined
  knowledgeId: string
}

async function getOneKnowledge({
  token,
  knowledgeId,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledgeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetQuestionListProps {
  token: string | undefined
  idQuiz: string
}

async function getQuestionList({
  token,
  idQuiz,
}: GetQuestionListProps): Promise<QuestionListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/question/quiz/${idQuiz}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface GetThreadsListProps {
  idCourse: string
  token: string | undefined
  limit: number
  page: number
}

async function getThreadList({
  idCourse,
  token,
  limit,
  page,
}: GetThreadsListProps): Promise<ThreadListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/threads?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

export default async function DetailCourse({ params, searchParams }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { quizId } = searchParams ?? {}

  const quidIdInitial = typeof quizId === "string" ? quizId : "1"

  const [courseDataResp, userDataResp, quizResp, contentType] =
    await Promise.all([
      getOneCourse({ token: user?.token, idCourse: params.detail }),
      getUsersList({ token: user?.token, limit: 1000, page: 1 }),
      getQuizListWithNullSection({ token: user?.token, isNull: true }),
      getContentType({
        token: user?.token,
        refCode: "001",
      }),
    ])

  const courseKnowledgeResp = await getOneKnowledge({
    token: user?.token,
    knowledgeId: courseDataResp.data.id_knowledge.toString(),
  })

  const threadsResp = await getThreadList({
    idCourse: params.detail,
    token: user?.token,
    limit: 1000,
    page: 1,
  })

  const questionResp = await getQuestionList({
    token: user?.token,
    idQuiz: quidIdInitial,
  })

  return (
    <DashboardShell>
      <CourseDetailShell
        courseDataResp={courseDataResp}
        courseKnowledgeResp={courseKnowledgeResp}
        quizResp={quizResp}
        questionResp={questionResp}
        userDataResp={userDataResp}
        contentTypeResp={contentType}
        threadRespData={threadsResp.data}
      />
    </DashboardShell>
  )
}
