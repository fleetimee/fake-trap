import { redirect } from "next/navigation"

import { QuizListRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateQuizSheet } from "@/components/app/quiz/operations"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, QuizTableShell } from "@/components/shell"

export const metadata = {
  title: "Quiz",
  description: "Quiz yang tersedia di e-learning",
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

interface GetQuizProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

async function getQuiz({
  token,
  page,
  limit,
  sortBy = "id_quiz",
  orderBy = "asc",
  searchQuery = "",
}: GetQuizProps): Promise<QuizListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface QuizPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, quiz_title, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "id_quiz"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial = typeof quiz_title === "string" ? quiz_title : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const [quizResp, referenceResp] = await Promise.all([
    getQuiz({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      sortBy: sortField,
      orderBy: sortOrder,
      searchQuery: searchQueryInitial,
    }),
    getQuizType({
      token: user?.token,
      refCode: "002",
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
            href: "/dashboard/quiz",
            title: "Quiz",
          },
        ]}
      />
      <div className="flex items-center justify-between gap-4">
        <DashboardHeader
          heading="Quiz"
          description="Quiz yang tersedia di e-learning"
        />
        <CreateQuizSheet referenceResp={referenceResp} />
      </div>
      {/*<QuizDataTable columns={columns} data={quizList.data} />*/}

      <QuizTableShell
        data={quizResp.data}
        pageCount={quizResp.totalPage}
        referenceResp={referenceResp}
      />
    </DashboardShell>
  )
}
