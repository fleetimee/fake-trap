import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getUserEnrolledCourseList } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Courses } from "@/components/ui/courses"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Pelatihan Kamu",
  description: "Pelatihan",
}

interface PesertaCoursePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PesertaCoursePage({
  searchParams,
}: PesertaCoursePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, search } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 6

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const sortBy = sortByInitial.split(".")[1]
  const orderBy = orderByInitial.split(".")[0]

  const searchInitial = typeof search === "string" ? search : ""

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const userCourse = await getUserEnrolledCourseList({
    token: user?.token,
    uuid: tokenExtracted?.id,
    limit: limitInitial,
    page: pageInitial,
    orderBy: orderBy,
    sortBy: sortBy,
    searchQuery: searchInitial,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/course",
            title: "Pelatihan",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <DashboardHeader
          heading="Pelatihan Kamu"
          description="Ini merupakan pelatihan yang kamu ikuti, jika tidak menemukan pelatihan yang kamu ikuti, silahkan hubungi admin.
          "
        />
      </MotionDiv>

      <Separator />

      <Courses courses={userCourse.data} pageCount={userCourse.totalPage} />
    </DashboardShell>
  )
}
