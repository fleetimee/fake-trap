import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { ApprovalCheckOne } from "@/types/approval/res/approval-check-get-one"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GetCheckCourseProps {
  token: string | undefined
  id: string
}

async function getCheckCourse({
  token,
  id,
}: GetCheckCourseProps): Promise<ApprovalCheckOne> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/0051/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

export const metadata: Metadata = {
  title: "Reject Pengajuan",
  description: "Reject Pengajuan",
}

interface PendingRejectedFormProps {
  params: {
    id: string
  }
}

export default async function PendingRejectedForm({
  params,
}: PendingRejectedFormProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const uuid = tokenExtract?.id

  const checkCourse = await getCheckCourse({
    id: params.id,
    token: user?.token,
  })

  const isCourseExist = checkCourse?.data?.is_exist

  if (!isCourseExist) {
    return notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="inline-flex items-center text-2xl">
            <span className="mr-2 inline-flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/supervisor-area/approval/approve-course/pending">
                      <Icons.chevronLeft className="h-6 w-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="p-4">
                    Kembali ke halaman sebelumnya
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            Reject Pelatihan
          </CardTitle>
          {/* <ProductPager product={product} /> */}
        </div>
        <CardDescription>
          <p>Apakah Anda yakin ingin menolak pengajuan pelatihan ini?</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <CourseApprovalForm id={params.id} uuid={uuid} /> */}
      </CardContent>
    </Card>
  )
}
