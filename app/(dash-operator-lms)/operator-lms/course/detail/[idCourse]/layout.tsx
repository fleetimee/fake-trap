import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseKnowledgeSection, getOneCourse } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
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

  // const knowledge = await getOneKnowledge({
  //   token: user?.token,
  //   idKnowledge: course?.data?.id_knowledge.toString(),
  // })

  const knowledgeSection = await getCourseKnowledgeSection({
    idCourse: params.idCourse,
    token: user?.token,
  })

  if (course.code === 400) {
    return notFound()
  }

  return (
    <DashboardShell>
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

      {/* <section className="hidden rounded-md bg-gray-800 py-14 md:block">
        <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              {course.data?.course_name}
            </h3>
            <p className="mt-3 text-gray-300">{course?.data?.course_desc}</p>
          </div>
          <div className="mt-4 flex-none md:mt-0">
            <Link
              href={`/operator-lms/course/detail/${params.idCourse}/section/new`}
              className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200"
            >
              Tambah Section
            </Link>
          </div>
        </div>
      </section> */}

      <SectionBanner
        title={course.data?.course_name}
        description={course?.data?.course_desc}
        urlLink={`/operator-lms/course/detail/${params.idCourse}/section/new`}
        canCreateSection
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
          materiButton={`/operator-lms/course/detail/${params.idCourse}/knowledge`}
          homeButton={`/operator-lms/course/detail/${params.idCourse}`}
          forumButton={`/operator-lms/course/detail/${params.idCourse}/threads`}
          userButton={`/operator-lms/course/detail/${params.idCourse}/people`}
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
          knowledgeSection={knowledgeSection.data}
          course={course}
          baseUrl={`/operator-lms/course/detail/${params.idCourse}`}
          canCreateContent
        />
      </div>
    </DashboardShell>
  )
}
