import { redirect } from "next/navigation"

import { QuizListRes } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

import { columns } from "./quiz-columns"
import { QuizDataTable } from "./quiz-data-table"

export const metadata = {
  title: "Quiz",
  description: "Quiz yang tersedia di e-learning",
}

interface GetQuizProps {
  token: string | undefined
  page: number
  limit: number
}

async function getQuiz({
  token,
  page,
  limit,
}: GetQuizProps): Promise<QuizListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
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

  const { page, per_page, sort, knowledge_title, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10

  const quizList = await getQuiz({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
  })

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
      <DashboardHeader
        heading="Quiz"
        description="Quiz yang tersedia di e-learning"
      />
      <QuizDataTable columns={columns} data={quizList.data} />
    </DashboardShell>
  )
}
