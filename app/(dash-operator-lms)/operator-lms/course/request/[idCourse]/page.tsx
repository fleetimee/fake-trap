import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getLookupCourseDetails,
  getOneCourse,
} from "@/lib/fetcher/course-fetcher"
import {
  getUsersByGroupId,
  getUsersSupervisor,
} from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { RequestCourseForm } from "@/components/forms/request-course-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Ajukan Pembelajaran Baru",
}

interface OperatorLmsCourseRequestPageProps {
  params: {
    idCourse: string
  }
}

export default async function OperatorLmsCourseRequestPage({
  params,
}: OperatorLmsCourseRequestPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/")
  }

  const [course, supervisors] = await Promise.all([
    getOneCourse({
      idCourse: params.idCourse,
      token: user?.token,
    }),

    getUsersSupervisor({
      token: user?.token,
      email: tokenExtracted?.email,
    }),
  ])

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
            href: "/operator-lms/course/request",
            title: "Ajukan Pembelajaran Baru",
          },
        ]}
      />

      <div className="lg:flex lg:items-start lg:space-x-10">
        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle>Preview Pembelajaran</CardTitle>
            <CardDescription>
              Silahkan cek kembali pembelajaran yang akan diajukan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookTitlePreview" className="font-bold">
                Judul Pembelajaran
              </Label>
              <div id="bookTitlePreview">{course.data.course_name}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookDescriptionPreview" className="font-bold">
                Deskripsi Pembelajaran
              </Label>
              <div id="bookDescriptionPreview">{course.data.course_desc}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookImagePreview" className="font-bold">
                Image
              </Label>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${course.data.image}`}
                alt={course.data.course_name}
                width={300}
                height={300}
                className="rounded-xl transition-all duration-300 ease-in-out "
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle>Cari Approval Pembelajaran</CardTitle>
            <CardDescription>
              Silahkan isi form dibawah ini untuk mengajukan pembelajaran baru.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RequestCourseForm
              idCourse={params.idCourse}
              requestUuid={tokenExtracted?.id}
              supervisors={supervisors.data}
              baseUrl="/operator-lms/course"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
