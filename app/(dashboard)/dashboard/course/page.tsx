import { redirect } from "next/navigation"

import { CourseListRes } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateCourseButton } from "@/components/app/course/operations/create-course-sheet"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CourseTableShell, DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kursus",
  description: "Kursus yang tersedia di e-learning",
}

interface GetCourseProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

async function getCourse({
  token,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
}: GetCourseProps): Promise<CourseListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetKnowledgeProps {
  token: string | undefined
  page: number
  limit: number
  orderBy?: string
  sortBy?: string
}

async function getKnowledge({
  token,
  page,
  limit,
  orderBy = "desc",
  sortBy = "created_at",
}: GetKnowledgeProps): Promise<KnowledgeListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface CoursePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CoursePage({ searchParams }: CoursePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortByInitial = typeof sort === "string" ? sort : "created_at"
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial = typeof course_name === "string" ? course_name : ""

  // Split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const [courseResp, knowledgeResp] = await Promise.all([
    getCourse({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      sortBy: sortBy,
      orderBy: orderBy,
      searchQuery: searchQueryInitial,
    }),
    getKnowledge({
      token: user?.token,
      page: pageInitial,
      limit: 100,
    }),
  ])

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/course",
            title: "Kursus",
          },
        ]}
      />
      <DashboardHeader
        heading="Kursus"
        description="Kursus yang tersedia di e-learning"
      >
        <CreateCourseButton knowledgeResp={knowledgeResp} />
      </DashboardHeader>
      {/*<div className="grid grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3">*/}
      {/*  {courseResp.data.map((item) => (*/}
      {/*    <CourseGrid data={item} dataKnowledge={knowledgeResp} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <CourseTableShell
        data={courseResp.data}
        knowledgeResp={knowledgeResp}
        pageCount={courseResp.totalPage}
      />
    </DashboardShell>
  )
}
