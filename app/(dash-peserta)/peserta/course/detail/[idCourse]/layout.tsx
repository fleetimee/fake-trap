import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getCheckUserCourseEnrollmentStatus,
  getCourseKnowledgeSection,
  getOneCourse,
} from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const course = await getOneCourse({
    idCourse: params.idCourse,
    token: user?.token,
  })

  if (course.code === 404) {
    return notFound()
  }

  const checkEnrolled = await getCheckUserCourseEnrollmentStatus({
    idCourse: params.idCourse,
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  const knowledgeSection = await getCourseKnowledgeSection({
    idCourse: params.idCourse,
    token: user?.token,
  })

  if (checkEnrolled.code === 404) {
    return notFound()
  }

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
          {
            href: `/peserta/course/detail/${params.idCourse}`,
            title: course.data.course_name,
          },
        ]}
      />

      <SectionBanner
        description={course.data.course_desc}
        title={course.data.course_name}
        urlLink={`/peserta/course/detail/${params.idCourse}`}
        canCreateSection={false}
        image={course.data.image}
      />

      <div className="flex items-center justify-end">
        <VercelToolbar
          materiButton={`/peserta/course/detail/${params.idCourse}/knowledge`}
          homeButton={`/peserta/course/detail/${params.idCourse}`}
          forumButton={`/peserta/course/detail/${params.idCourse}/threads`}
          userButton={`/peserta/course/detail/${params.idCourse}/people`}
        />
      </div>

      {knowledgeSection.data && knowledgeSection.data.length > 0 && (
        <CourseAlert knowledgeSection={knowledgeSection} />
      )}

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        <Content title={course.data.course_name}>{children}</Content>

        <CourseContentSidebar
          course={course}
          baseUrl={`/peserta/course/detail/${params.idCourse}`}
          canCreateContent={false}
          knowledgeSection={knowledgeSection.data}
        />
      </div>
    </DashboardShell>
  )
}
