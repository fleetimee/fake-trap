import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
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

import { UserKnowledgeWrapper } from "./_components/user-knowledge-wrapper"

interface GetKnowledgeProps {
  token: string | undefined
  page: number
  limit: number
  searchQuery?: string
  sortField?: string
  sortOrder?: string
}

async function getKnowledge({
  token,
  page,
  limit,
  searchQuery,
  sortField = "created_at",
  sortOrder = "desc",
}: GetKnowledgeProps): Promise<KnowledgeListRes> {
  const knowledgeList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/?page=${page}&limit=${limit}&sortBy=${sortField}&orderBy=${sortOrder}&searchQuery=${searchQuery}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await knowledgeList.json()
}

export default async function MemberKnowledgePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledgeResp = await getKnowledge({
    token: user?.token,
    page: 1,
    limit: 100,
    searchQuery: "",
    sortField: "created_at",
    sortOrder: "desc",
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
            href: "/member-area/knowledge",
            title: "Pengetahuan",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Pengetahuan" />
      </MotionDiv>

      <Card className="h-full min-h-[60rem]">
        <CardHeader>
          <CardTitle>Semua Pengetahuan</CardTitle>
          <CardDescription>
            Pelajari lebih banyak tentang pengetahuan yang ada di dalam aplikasi
            ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UserKnowledgeWrapper knowledgeResp={knowledgeResp} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
