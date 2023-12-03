import Link from "next/link"
import { redirect } from "next/navigation"

import { CourseListRes } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { CreateButton } from "@/components/create-button"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CourseTableShell, DashboardShell } from "@/components/shell"





export const metadata = {
  title: "Pelatihan",
  description: "Pelatihan yang tersedia di e-learning",
}

interface GetCourseProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  statusText?: string | string[] | undefined // Add this line
}

async function getCourse({
  token,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
  statusText = "", // Add this line
}: GetCourseProps): Promise<CourseListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/v2/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (statusText) {
    url = `${url}&status=${statusText}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

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

  const tokenExtracted = extractToken(user?.token)

  const { page, per_page, sort, course_name, status_text } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  if (tokenExtracted.group === 3) {
    // Initial value
    const pageInitial = typeof page === "string" ? parseInt(page) : 1
    const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
    const sortByInitial = typeof sort === "string" ? sort : "created_at"
    const orderByInitial = typeof sort === "string" ? sort : "desc"
    const searchQueryInitial =
      typeof course_name === "string" ? course_name : ""

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
        statusText: status_text, // Add this line
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
              href: "/main",
              title: "Dashboard",
            },
            {
              href: "/main/course",
              title: "Pelatihan",
            },
          ]}
        />
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Pelatihan"
            description="Pelatigan yang tersedia di e-learning"
          >
            <Link href={"/main/course/new"}>
              <CreateButton
                className="transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110"
                name="Tambah"
              />
            </Link>
          </DashboardHeader>
        </MotionDiv>

        <CourseTableShell
          data={courseResp.data}
          knowledgeResp={knowledgeResp}
          pageCount={courseResp.totalPage}
        />
      </DashboardShell>
    )
  }
}
