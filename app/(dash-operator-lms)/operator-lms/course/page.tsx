import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourse, getKnowledgeV2 } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CourseTableShell, DashboardShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pelatihan",
  description: "Pelatihan",
}

interface OperatorLMSCoursePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSCoursePage({
  searchParams,
}: OperatorLMSCoursePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, course_name, status_text } = searchParams ?? {}

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

  const course = await getCourse({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortBy,
    orderBy: orderBy,
    searchQuery: searchQueryInitial,
    statusText: status_text,
  })

  const knowledge = await getKnowledgeV2({
    token: user?.token,
    page: 1,
    limit: 1000,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/course",
            title: "Pelatihan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Pelatihan"
            description="Kelola pelatihan yang ada di platform lms."
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end "
        >
          <Link
            href="/operator-lms/course/new"
            className={buttonVariants({
              size: "sm",
              className: "ml-2",
            })}
          >
            Buat Pelatihan Baru
          </Link>
        </MotionDiv>
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <CourseTableShell
          data={course.data}
          knowledgeResp={knowledge}
          pageCount={course.totalPage}
          isOperator={true}
        />
      </Suspense>
    </DashboardShell>
  )
}
