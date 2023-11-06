import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CourseRequestForm } from "./_components/request-course-form"

export const metadata: Metadata = {
  title: "Ajukan Pelatihan",
  description: "Ajukan Pelatihan",
}

interface CourseRequestProps {
  params: {
    idCourse: string
  }
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

interface LookupCourseProps {
  token: string | undefined
  idCourse: string
}

async function lookupCourse({ token, idCourse }: LookupCourseProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/lookup`,
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

export default async function CourseRequest({ params }: CourseRequestProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const uuid = tokenExtract?.id

  const courseData = await getOneCourse({
    token: user.token,
    idCourse: params.idCourse,
  })

  const lookupCourseData = await lookupCourse({
    token: user.token,
    idCourse: params.idCourse,
  })

  if (lookupCourseData.data) {
    return notFound()
  }

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
            title: courseData.data?.course_name,
          },
          {
            href: `/dashboard/course/${params.idCourse}/request-form`,
            title: "Ajukan Pelatihan",
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
              Ajukan Pelatihan
            </CardTitle>
            {/* <ProductPager product={product} /> */}
          </div>
          <CardDescription className="space-y-2 px-8 text-sm">
            Ajukan Pelatihan baru untuk ditinjau oleh supervisor
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Jumlah Section</TableHead>
                <TableHead>Peserta</TableHead>
                <TableHead className="text-right">Tgl Pembuatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {courseData.data.id_course}
                </TableCell>
                <TableCell>{courseData.data.course_name}</TableCell>
                <TableCell>
                  {courseData.data.section ? courseData.data.section.length : 0}
                </TableCell>
                <TableCell>
                  {courseData.data.users
                    ? courseData.data.users.length
                    : 0 + " Orang"}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(courseData.data.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <CourseRequestForm idCourse={params.idCourse} uuid={uuid} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
