import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getUsersByGroupId } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddCourseForm } from "@/components/forms/add-course-form"
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
  title: "Tambah Pembelajaran Baru",
  description: "Operator LMS New Course Page",
}

export default async function OperatorLMSCoursePageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOperatorKnowledge({
    token: user?.token,
    page: 1,
    limit: 1000,
  })

  const tutors = await getUsersByGroupId({
    token: user?.token,
    idGroup: 1,
  })

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
            href: "/operator-lms/course/new",
            title: "Tambah Pembelajaran Baru",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Pembelajaran</CardTitle>
          <CardDescription>
            Tambahkan pembelajaran baru ke dalam platform lms.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AddCourseForm
            knowledge={knowledge.data}
            tutors={tutors.data}
            baseUrl={"/operator-lms/course"}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
