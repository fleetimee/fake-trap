import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import {
  checkUserEnrolled,
  getCourseKnowledgeSection,
  getOneCourse,
  getOneKnowledge,
} from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Content } from "@/components/content"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

  const checkEnrolled = await checkUserEnrolled({
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
          materiButton={`/peserta/course/detail/${params.idCourse}/knowledge`}
          homeButton={`/peserta/course/detail/${params.idCourse}`}
          forumButton={`/peserta/course/detail/${params.idCourse}/threads`}
          userButton={`/peserta/course/detail/${params.idCourse}/people`}
        />
      </div>

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
