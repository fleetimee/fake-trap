import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { ApprovalCourseOneRes } from "@/types/approval/res"
import { CourseOneRes } from "@/types/course/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Icons } from "@/components/icons"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CourseRevisionForm } from "./_components/revision-course-form"
import { RevisionInformation } from "./_components/revision-information"

export const metadata: Metadata = {
  title: "Revisi Pelatihan",
  description: "Revisi Pelatihan",
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface CourseRevisionProps {
  params: {
    idCourse: string
  }
}

interface GetOneApprovalCourseProps {
  token: string | undefined
  idCourse: number
}

async function getOneApprovalCourse({
  token,
  idCourse,
}: GetOneApprovalCourseProps): Promise<ApprovalCourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/detail/${idCourse}`,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

export default async function CourseRevision({ params }: CourseRevisionProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const uuid = tokenExtract?.id

  const course = await getOneCourse({
    idCourse: params.idCourse,
    token: user.token,
  })

  const approval = await getOneApprovalCourse({
    idCourse: Number(params.idCourse),
    token: user.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/course",
            title: "Pelatihan",
          },
          {
            href: `/dashboard/course/${params.idCourse}`,
            title: `${course.data.course_name}`,
          },
          {
            href: `/dashboard/course/revision-form/${params.idCourse}`,
            title: "Revisi Pelatihan",
          },
        ]}
      />

      <Card className="max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between space-x-2">
            <CardTitle className="inline-flex items-center text-2xl">
              <span className="mr-2 inline-flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href="/dashboard/course">
                        <Icons.chevronLeft className="h-6 w-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-4">
                      Kembali ke halaman sebelumnya
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              Revisi Pengajuan Pelatihan
            </CardTitle>
            {/* <ProductPager product={product} /> */}
          </div>
          <CardDescription className="space-y-2 px-8 text-sm">
            Revisi Pengajuan Pelatihan ini akan dikirimkan kembali ke supervisor
          </CardDescription>
        </CardHeader>
        <hr className="border-gray-200 py-2 dark:border-gray-700" />
        <CardContent className="grid grid-cols-1 gap-8">
          <RevisionInformation approval={approval} />
          <hr className="border-gray-200 py-2 dark:border-gray-700" />

          <CourseRevisionForm
            idApproval={approval.data.id_approval_course.toString()}
          />
          <Label className="text-sm text-red-400">
            Pastikan Pelatihan ini sudah di revisi sesuai dengan ketentuan
            Supervisor kemudian kirim ulang pengajuan ini
          </Label>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
