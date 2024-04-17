import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getUsersByGroupId } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { UpdateCourseForm } from "@/components/forms/update-course-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Update Pembelajaran",
  description: "Operator LMS Update Course Page",
}

interface OperatorLMSCoursePageUpdateProps {
  params: {
    idCourse: string
  }
}

export default async function OperatorLMSCoursePageUpdate({
  params,
}: OperatorLMSCoursePageUpdateProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const course = await getOneCourse({
    idCourse: params.idCourse,
    token: user?.token,
  })

  const knowledge = await getOperatorKnowledge({
    token: user?.token,
    page: 1,
    limit: 1000,
  })

  const tutors = await getUsersByGroupId({
    token: user?.token,
    idGroup: 1,
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
            title: "Pembelajaran",
          },
          {
            href: `/operator-lms/course/update/${params.idCourse}`,
            title: "Update Pembelajaran",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Update Pembelajaran</CardTitle>
          <CardDescription>Update pembelajaran yang sudah ada</CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateCourseForm
            course={course.data}
            knowledge={knowledge.data}
            tutors={tutors.data}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
