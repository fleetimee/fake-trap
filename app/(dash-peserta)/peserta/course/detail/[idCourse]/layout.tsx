import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Clock11, Scroll, Terminal } from "lucide-react"

import { CourseOneResSection } from "@/types/course/res"
import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import {
  getCourseKnowledgeSection,
  getOneCourse,
} from "@/lib/fetcher/course-fetcher"
import {
  getCheckUserCourseEnrollmentStatus,
  getUserPretestCheck,
  markCourseAsAccessed,
} from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken, getCourseStatus } from "@/lib/utils"
import { Content } from "@/components/content"
import { CountdownTimer } from "@/components/countdown-timer"
import { CourseAlert } from "@/components/course-alert"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { CourseContentSidebarPretest } from "@/components/course-content-sidebar-pretest"
import { SectionBanner } from "@/components/create-section-banner"
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

  const courseStatus = getCourseStatus({
    dateEnd: course.data.date_end,
    dateStart: course.data.date_start,
  })

  const checkUserPretest = await getUserPretestCheck({
    idCourse: params.idCourse,
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  const markCourse = await markCourseAsAccessed({
    token: user?.token,
    idCourse: params.idCourse,
    uuid: tokenExtracted?.id,
  })

  let filteredSections: CourseOneResSection[] = []

  if (course && course.data && course.data.section) {
    filteredSections = course.data.section.filter((section) => {
      // Filter the quizzes in each section
      const filteredQuizzes = section.quiz.filter(
        (quiz) => quiz.quiz_type === "0021"
      )

      // If there are any quizzes left after filtering, return true (keep the section)
      return filteredQuizzes.length > 0
    })
  }

  const notAvailable = courseStatus !== CourseAvailability.ACTIVE

  return (
    <DashboardShell>
      <div className="hidden sm:block">
        <BreadCrumbs
          segments={[
            {
              href: "/peserta",
              title: "Dashboard",
            },
            {
              href: "/peserta/course",
              title: "Pembelajaran",
            },
            {
              href: `/peserta/course/detail/${params.idCourse}`,
              title: course.data.course_name,
            },
          ]}
        />
      </div>

      <div className="md:px-2">
        <Alert variant="destructive" className="mb-4">
          <Clock11 className="h-4 w-4" />
          <AlertTitle>Deadline!</AlertTitle>
          <AlertDescription>
            Batas akhir pembelajaran hingga{" "}
            <span className="font-bold">
              {new Date(course.data.date_end).toLocaleString("id-ID", {
                weekday: "long", // "long" for the full name of the day, "short" for the abbreviated version.
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // Optional: Use 24-hour format
              })}
            </span>
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <Scroll className="h-4 w-4" />
          <AlertTitle>Catatan!</AlertTitle>
          <AlertDescription>
            Kamu dapat merangkum materi pembelajaran pada menu "Notes"
          </AlertDescription>
        </Alert>
      </div>

      <div className="relative hidden sm:block">
        <SectionBanner
          description={course.data.course_desc}
          title={course.data.course_name}
          urlLink={`/peserta/course/detail/${params.idCourse}`}
          image={course.data.image}
        />
        {/* Updated container styling */}
        <div className="absolute right-4 top-4">
          <CountdownTimer endDate={new Date(course.data.date_end)} />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <VercelToolbar
          materiButton={`/peserta/course/detail/${params.idCourse}/knowledge`}
          homeButton={`/peserta/course/detail/${params.idCourse}`}
          forumButton={`/peserta/course/detail/${params.idCourse}/threads`}
          userButton={`/peserta/course/detail/${params.idCourse}/people`}
          noteButton={`/peserta/course/detail/${params.idCourse}/notes`}
        />
      </div>

      {knowledgeSection.data && knowledgeSection.data.length > 0 && (
        <CourseAlert knowledgeSection={knowledgeSection} />
      )}

      <div
        className="flex h-auto flex-col gap-4 md:px-2 lg:flex-row"
        id="scrollTarget"
      >
        <Content
          title={course.data.course_name}
          className={notAvailable ? "basis-full" : undefined}
        >
          {children}
        </Content>
        {notAvailable ? null : checkUserPretest.data ? (
          <CourseContentSidebar
            course={course}
            baseUrl={`/peserta/course/detail/${params.idCourse}`}
            canCreateContent={false}
            canCreateSection={false}
            knowledgeSection={knowledgeSection.data}
          />
        ) : (
          <CourseContentSidebarPretest
            filteredSections={filteredSections}
            baseUrl={`/peserta/course/detail/${params.idCourse}`}
          />
        )}
      </div>
    </DashboardShell>
  )
}
