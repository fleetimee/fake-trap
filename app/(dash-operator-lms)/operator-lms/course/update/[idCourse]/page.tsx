import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { fetchUsersByGroupId, getOneCourse } from "@/lib/fetcher"
import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
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
  title: "Update Pelatihan",
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

  const tutors = await fetchUsersByGroupId({
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
            title: "Pelatihan",
          },
          {
            href: `/operator-lms/course/update/${params.idCourse}`,
            title: "Update Pelatihan",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Update Pelatihan</CardTitle>
          <CardDescription>Update pelatihan yang sudah ada</CardDescription>
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
