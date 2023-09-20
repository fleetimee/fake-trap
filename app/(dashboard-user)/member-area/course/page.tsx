import { redirect } from "next/navigation"

import { UserEnrolledCourseListRes } from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Pelatihan Kamu",
  description: "Halaman pelatihan member area",
}

interface GetUserEnrolledCourseList {
  token: string | undefined
  uuid: string | undefined
  limit: number
  page: number
  searchQuery?: string
}

async function getUserEnrolledCourseList({
  token,
  uuid,
  limit,
  page,
  searchQuery,
}: GetUserEnrolledCourseList): Promise<UserEnrolledCourseListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getEnrolledCourse?limit=${limit}&page=${page}&search=${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

export default async function MemberCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const userEnrolledCourseResp = await getUserEnrolledCourseList({
    token: user?.token,
    uuid: tokenExtracted?.id,
    limit: 1000,
    page: 1,
    searchQuery: "",
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/course",
            title: "Pelatihan Kamu",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <DashboardHeader heading="Pelatihan Kamu" />
      </MotionDiv>
    </DashboardShell>
  )
}
