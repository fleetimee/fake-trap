import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UserCategoryWrapper } from "./_components/user-category-wrapper"

export const metadata = {
  title: "Kategori",
  description: "Halaman kategori member area",
}

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
}

async function getCategory({
  token,
  page,
  limit,
}: GetCategoryProps): Promise<CategoryListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default async function MemberCategoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categoryResp = await getCategory({
    token: user?.token,
    page: 1,
    limit: 1000,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/category",
            title: "Kategori",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Kategori" />
      </MotionDiv>

      <Card className="h-full max-h-max min-h-[40rem]">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CardHeader>
            <CardTitle>Semua Kategori</CardTitle>
            <CardDescription>
              Temukan pengetahuan berdasarkan kategori yang tersedia
            </CardDescription>
          </CardHeader>

          <CardContent>
            <UserCategoryWrapper categoryResp={categoryResp} />
          </CardContent>
        </MotionDiv>
      </Card>
    </DashboardShell>
  )
}
