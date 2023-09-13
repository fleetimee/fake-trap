import { redirect } from "next/navigation"
import { Terminal } from "lucide-react"

import { QuizMemberListRes } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell, QuizMemberTableShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetQuizMemberProps {
  token: string | undefined
  quizId: string
  limit: number
  page: number
  sortBy: string
  orderBy: string
}

async function getQuizMember({
  token,
  quizId,
  limit,
  page,
  sortBy = "attemps",
  orderBy = "desc",
}: GetQuizMemberProps): Promise<QuizMemberListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/getMember?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`,
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

interface PesertaPageProps {
  params: {
    quizId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PesertaPage({
  params,
  searchParams,
}: PesertaPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "attemps"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const quizMember = await getQuizMember({
    token: user?.token,
    quizId: params.quizId,
    limit: limitInitial,
    page: pageInitial,
    sortBy: sortBy,
    orderBy: orderBy,
  })

  return (
    <DashboardShell>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <QuizMemberTableShell
        data={quizMember.data}
        pageCount={quizMember.totalPage}
      />
    </DashboardShell>
  )
}
