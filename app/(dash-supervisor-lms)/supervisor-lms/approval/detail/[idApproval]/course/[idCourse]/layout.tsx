import React from "react"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getOneCourse, getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

  const knowledge = await getOneKnowledge({
    token: user?.token,
    idKnowledge: course.data?.id_knowledge.toString(),
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
        canCreateSection={false}
      />

      <MotionDiv
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
      </MotionDiv>

      <div className="flex items-center justify-end">
        <VercelToolbar
          homeButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}`}
          forumButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/threads`}
          userButton={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/people`}
        />
      </div>

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
        />
      </div>
    </DashboardShell>
  )
}
