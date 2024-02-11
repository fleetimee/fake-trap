import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getCourseKnowledgeSection,
  getOneCourse,
} from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { CourseAlert } from "@/components/course-alert"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { VercelToolbar } from "@/components/vercel-toolbar"

interface CourseDetailLayoutProps {
  children: React.ReactNode
  params: {
    idCourse: string
  }
}

export async function generateMetadata({
  params,
}: CourseDetailLayoutProps): Promise<Metadata> {
  const user = await getCurrentUser()

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  return {
    title: course?.data?.course_name,
    description: course?.data?.course_desc,
  }
}

export default async function CourseDetailLayout({
  children,
  params,
}: CourseDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const knowledgeSection = await getCourseKnowledgeSection({
    idCourse: params.idCourse,
    token: user?.token,
  })

  if (course.code === 400) {
    return notFound()
  }

  return (
    <DashboardShell>
      <div className="hidden sm:block">
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
            {
              href: `/operator-lms/course/detail/${params.idCourse}`,
              title: course?.data?.course_name,
            },
          ]}
        />
      </div>

      <div className="hidden sm:block">
        <SectionBanner
          title={course.data?.course_name}
          description={course?.data?.course_desc}
          urlLink={`/operator-lms/course/detail/${params.idCourse}/section/new`}
          image={course?.data?.image}
        />
      </div>

      <div className="flex items-center justify-end">
        <VercelToolbar
          materiButton={`/operator-lms/course/detail/${params.idCourse}/knowledge`}
          homeButton={`/operator-lms/course/detail/${params.idCourse}`}
          forumButton={`/operator-lms/course/detail/${params.idCourse}/threads`}
          userButton={`/operator-lms/course/detail/${params.idCourse}/people`}
        />
      </div>

      {knowledgeSection.data && knowledgeSection.data.length > 0 && (
        <CourseAlert
          knowledgeSection={knowledgeSection}
          singleLink={`/operator-lms/knowledge/detail`}
        />
      )}

      <div
        className="flex h-auto flex-col gap-4 md:px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content Section */}
        <Content title={course?.data?.course_name}>{children}</Content>

        {/* Sidebar Section */}
        <CourseContentSidebar
          knowledgeSection={knowledgeSection.data}
          course={course}
          baseUrl={`/operator-lms/course/detail/${params.idCourse}`}
          canCreateContent
          canCreateSection
        />
      </div>
    </DashboardShell>
  )
}
