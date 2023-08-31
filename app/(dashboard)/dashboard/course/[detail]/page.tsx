import { Metadata } from "next"
import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { QuizListRes } from "@/types/quiz/res"
import { UserListRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CourseDetailShell } from "@/components/app/course/detail/ui"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    detail: string
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

export default async function DetailCourse({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [courseDataResp, userDataResp, quizResp] = await Promise.all([
    getOneCourse({ token: user?.token, idCourse: params.detail }),
    getUsersList({ token: user?.token, limit: 1000, page: 1 }),
    getQuizListWithNullSection({ token: user?.token, isNull: true }),
  ])

  const courseKnowledgeResp = await getOneKnowledge({
    token: user?.token,
    knowledgeId: courseDataResp.data.id_knowledge.toString(),
  })

  return (
    <DashboardShell>
      <CourseDetailShell
        courseDataResp={courseDataResp}
        courseKnowledgeResp={courseKnowledgeResp}
        quizResp={quizResp}
        userDataResp={userDataResp}
      />
    </DashboardShell>
  )
}
