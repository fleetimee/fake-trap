import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateKnowledgeButton } from "@/components/app/knowledge/operations"
import { KnowledgeItemList } from "@/components/app/knowledge/ui"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Pengetahuan",
  description: "Pengetahuan yang tersedia di e-learning",
}

interface GetKnowledgeProps {
  token: string | undefined
  page: number
  limit: number
}

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
}

async function getKnowledge({
  token,
  page,
  limit,
}: GetKnowledgeProps): Promise<KnowledgeListRes> {
  const knowledgeList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/?page=${page}&limit=${limit}`,
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

async function getCategory({
  token,
  page,
  limit,
}: GetCategoryProps): Promise<CategoryListRes> {
  const categoryList = await fetch(
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

  return await categoryList.json()
}

export default async function KnowledgePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [knowledgeResp, categoryResp] = await Promise.all([
    getKnowledge({ token: user?.token, page: 1, limit: 10 }),
    getCategory({ token: user?.token, page: 1, limit: 10 }),
  ])

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/knowledge",
            title: "Pengetahuan",
          },
        ]}
      />
      <DashboardHeader
        heading="Pengetahuan"
        description="Pengetahuan yang tersedia di e-learning"
      >
        <CreateKnowledgeButton
          categoryResponse={categoryResp}
          token={user?.token}
        />
      </DashboardHeader>
      <div className="divide-y divide-border rounded-md border">
        {knowledgeResp.data.map((item) => (
          <KnowledgeItemList
            key={item.id_knowledge}
            knowledgeData={item}
            categoryResponse={categoryResp}
            token={user?.token}
          />
        ))}
      </div>
    </DashboardShell>
  )
}
