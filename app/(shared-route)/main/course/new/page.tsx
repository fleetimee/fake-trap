import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { GroupOneRes } from "@/types/group/res/group-get-one"
import { UserGroupListRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
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
  title: "Tambah Pelatihan",
  description: "Tambah Pelatihan baru",
}

interface GetGroupRuleProps {
  token: string | undefined
  idGroup: number
}

async function getGroupRule({
  token,
  idGroup,
}: GetGroupRuleProps): Promise<GroupOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/group/${idGroup}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetPemateriProps {
  token: string | undefined
  idGroup: number
}

async function getPemateriList({
  token,
  idGroup,
}: GetPemateriProps): Promise<UserGroupListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/group/${idGroup}/`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

export default async function NewCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const pemateri = await getPemateriList({
    token: user?.token,
    idGroup: 1,
  })

  const getRule = await getGroupRule({
    token: user?.token,
    idGroup: tokenExtracted?.group,
  })

  if (!getRule.data.can_write_course) {
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
            href: "/main/course",
            title: "Pelatihan",
          },
          {
            href: "/main/course/new",
            title: "Tambah Pelatihan",
          },
        ]}
      />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Tambah Pelatihan</CardTitle>
          <CardDescription>Tambah Pelatihan baru</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCourseForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
