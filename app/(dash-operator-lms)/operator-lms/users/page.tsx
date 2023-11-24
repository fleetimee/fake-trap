import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorQuiz, getReference, getUserV2 } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import {
  DashboardShell,
  QuizTableShell,
  UserTableShell,
} from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Managemen User",
  description: "Managemen User",
}

interface OperatorLMSUsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSUsersPage({
  searchParams,
}: OperatorLMSUsersPageProps) {
  const { page, per_page, sort, username, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const nameInitial = typeof username === "string" ? username : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const user = await getCurrentUser()

  const userList = await getUserV2({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: nameInitial,
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/users",
            title: "Managemen User",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Managemen User"
            description="Kelola user yang dapat mengakses sistem"
          />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end"
        >
          <Link
            href="/operator-lms/users/new"
            className={buttonVariants({
              size: "sm",
              className: "ml-2",
            })}
          >
            Buat User Baru
          </Link>
        </MotionDiv>
      </div>

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <UserTableShell data={userList.data} pageCount={userList.totalPage} />
      </MotionDiv>
    </DashboardShell>
  )
}