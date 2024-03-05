import React from "react"
import Link from "next/link"
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
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
      <div className="hidden md:block">
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
      </div>

      <div className="hidden md:block">
        <SectionBanner
          description={course?.data?.course_desc}
          title={course?.data?.course_name}
          urlLink={`/pemateri-divisi/course/detail/${params.idCourse}/section/new`}
          image={course?.data?.image}
        />
      </div>

      <div className="px-2">
        <Alert className="text-primary-700 flex flex-col gap-2   lg:flex-none lg:gap-0">
          <Icons.handShake className="size-4" />
          <AlertTitle>Approve Materi</AlertTitle>
          <AlertDescription>
            Silahkan approve materi menggunakan tombol di samping
          </AlertDescription>
          <div className="flex w-full flex-row justify-end gap-2 lg:w-auto">
            <Link
              href={`/supervisor-lms/approval/confirmation/${params.idApproval}`}
            >
              <Button className="w-full lg:w-auto">Approve</Button>
            </Link>
          </div>
        </Alert>
      </div>

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
        className="flex h-auto flex-col gap-4 md:px-2 lg:flex-row"
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
