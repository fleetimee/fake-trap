import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { ThreadListRes } from "@/types/threads/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

interface MemberCourseDetailPageProps {
  params: {
    detail: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
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

export default async function MemberCourseDetailPage({
  params,
  searchParams,
}: MemberCourseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { quizId } = searchParams ?? {}

  const quizIdInitial = typeof quizId === "string" ? quizId : "1"

  const [courseDataResp] = await Promise.all([
    getOneCourse({
      token: user?.token,
      idCourse: params.detail,
    }),
  ])

  const courseKnowledgeResp = await getOneKnowledge({
    token: user?.token,
    knowledgeId: courseDataResp.data.id_knowledge.toString(),
  })

  const threadResp = await getThreadList({
    idCourse: params.detail,
    token: user?.token,
    limit: 10,
    page: 1,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/course",
            title: "Pelatihan",
          },
          {
            title: courseDataResp.data.course_name,
            href: `/dashboard/knowledge/${courseDataResp.data.id_course}`,
          },
        ]}
      />
    </DashboardShell>
  )
}
