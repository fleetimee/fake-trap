import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getPaginatedCourseData,
  getPaginatedKnowledgeData,
} from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import CourseGrid from "@/components/app/course/course-grid"
import { CreateCourseButton } from "@/components/app/course/create-course-sheet"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kursus",
  description: "Kursus yang tersedia di e-learning",
}

export default async function CoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const COURSE_PAGE_LIMIT = 1000
  const COURSE_PAGE_SIZE = 1

  const KNOWLEDGE_PAGE_LIMIT = 1000
  const KNOWLEDGE_PAGE_SIZE = 1

  const dataCourse = getPaginatedCourseData({
    limit: COURSE_PAGE_LIMIT,
    page: COURSE_PAGE_SIZE,
    token: user?.token,
  })
  const dataKnowledge = getPaginatedKnowledgeData({
    limit: KNOWLEDGE_PAGE_LIMIT,
    page: KNOWLEDGE_PAGE_SIZE,
    token: user?.token,
  })

  const [courseResp, knowledgeResp] = await Promise.all([
    dataCourse,
    dataKnowledge,
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
            href: "/dashboard/course",
            title: "Kursus",
          },
        ]}
      />
      <DashboardHeader
        heading="Kursus"
        description="Kursus yang tersedia di e-learning"
      >
        <CreateCourseButton data={knowledgeResp} />
      </DashboardHeader>
      <div className="grid grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseResp.data.map((item) => (
          <CourseGrid data={item} dataKnowledge={knowledgeResp} />
        ))}
      </div>
    </DashboardShell>
  )
}
