import { Metadata } from "next"
import { redirect } from "next/navigation"

import { UserQuizTakenListRes } from "@/types/me/res"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserRecentQuizTableShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Semua Percobaan Quiz Saya",
  description: "Semua percobaan quiz saya",
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

interface GetUserQuizAttemptList {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  quizTypes?: string | string[] | undefined
}

async function getUserQuizAttemptList({
  token,
  uuid,
  page,
  limit,
  sortBy = "asc",
  orderBy = "created_at",
  searchQuery = "",
  quizTypes = "",
}: GetUserQuizAttemptList): Promise<UserQuizTakenListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizThatUserTaken?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (quizTypes) {
    url = `${url}&quizTypes=${quizTypes}`
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

interface MeQuizPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function MemberMePage({ searchParams }: MeQuizPageProps) {
  const user = await getCurrentUser()

  const tokenExtract = extractToken(user?.token)

  const { page, per_page, sort, quiz_title, quiz_type } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortInitial = typeof sort === "string" ? sort : "desc"
  const orderByInitial = typeof sort === "string" ? sort : "created_at"

  // split sort
  const sortBy = sortInitial.split(".")[1]
  const orderBy = orderByInitial.split(".")[0]

  const [quizResp, referenceResp] = await Promise.all([
    getUserQuizAttemptList({
      token: user?.token,
      uuid: tokenExtract.id,
      page: pageInitial,
      limit: limitInitial,
      sortBy,
      orderBy,
      searchQuery: quiz_title as string,
      quizTypes: quiz_type,
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
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/me",
            title: `${tokenExtract.username} - (${tokenExtract.email})`,
          },
          {
            href: "/member-area/me/recent-quiz",
            title: "Riwayat Quiz",
          },
        ]}
      />
      <DashboardHeader
        heading="Riwayat Quiz"
        description="Riawayt quiz yang pernah saya ikuti"
      />
      <UserRecentQuizTableShell
        data={quizResp.data}
        pageCount={quizResp.totalPage}
        referenceResp={referenceResp}
      />
    </DashboardShell>
  )
}
