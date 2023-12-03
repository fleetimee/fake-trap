import { redirect } from "next/navigation"
import { Wand2 } from "lucide-react"

import { QuizUserAttemptList } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell, UserQuizResultTableShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"





export const metadata = {
  title: "Hasil Quiz",
  description: "Halaman untuk melihat hasil quiz",
}

interface GetUserQuizAttempt {
  token: string | undefined
  quizId: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
}

async function getUserQuizAttempt({
  token,
  quizId,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
}: GetUserQuizAttempt): Promise<QuizUserAttemptList> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/getUserAttempt?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface HasilPageProps {
  params: {
    quizId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function HasilPage({
  params,
  searchParams,
}: HasilPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  // split sort
  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const quizUserAttemptResp = await getUserQuizAttempt({
    token: user?.token,
    quizId: params.quizId,
    limit: limitInitial,
    page: pageInitial,
    sortBy,
    orderBy,
  })

  return (
    <DashboardShell>
      <Alert>
        <Wand2 className="h-4 w-4" />
        <AlertTitle>Riwayat Percobaan Quiz</AlertTitle>
        <AlertDescription>
          Berikut adalah riwayat percobaan quiz yang sudah dilakukan oleh
          peserta quiz ini
        </AlertDescription>
      </Alert>
      <UserQuizResultTableShell
        data={quizUserAttemptResp.data}
        pageCount={quizUserAttemptResp.totalPage}
      />
    </DashboardShell>
  )
}
