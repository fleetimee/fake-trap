import React from "react"
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

interface ApprovalDetailKnowledgePageProps {
  params: {
    idApproval: string
    idCourse: string
  }
  children: React.ReactNode
}

export async function generateMetadata({
  params,
}: ApprovalDetailKnowledgePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  return {
    title: course.data?.course_name,
    description: course.data?.course_desc,
  }
}

export default async function CourseDetailLayout({
  params,
  children,
}: ApprovalDetailKnowledgePageProps) {
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

  if (course.code !== 200) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-lms",
            title: "Dashboard",
          },
          {
            href: "/supervisor-lms/approval",
            title: "Approve Pelatihan",
          },
          {
            href: `/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}`,
            title: course.data?.course_name,
          },
        ]}
      />

      <SectionBanner
        description={course?.data?.course_desc}
        title={course?.data?.course_name}
        urlLink={`/pemateri-divisi/course/detail/${params.idCourse}/section/new`}
        image={course?.data?.image}
      />

      {/* <MotionDiv
        className="flex flex-row gap-4 px-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="basis-full">
          <PartyPopper className="h-5 w-5" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Pelatihan ini berdasarkan pada pengetahuan{" "}
            <span className="font-bold">{knowledge.data.knowledge_title}</span>
          </AlertDescription>
        </Alert>
      </MotionDiv> */}

      <div className="flex items-center justify-end">
        <VercelToolbar
          materiButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/knowledge`}
          homeButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}`}
          forumButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/threads`}
          userButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/people`}
        />
      </div>

      {knowledgeSection.data && knowledgeSection.data.length > 0 && (
        <CourseAlert
          knowledgeSection={knowledgeSection}
          singleLink={`/intro/knowledge`}
        />
      )}

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content Section */}
        <Content title={course?.data?.course_name}>{children}</Content>

        {/* Sidebar Section */}
        <CourseContentSidebar
          course={course}
          baseUrl={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}`}
          canCreateContent={false}
          canCreateSection={false}
          knowledgeSection={knowledgeSection.data}
        />
      </div>
    </DashboardShell>
  )
}
