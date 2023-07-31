import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getAllCategoriesData,
  getPaginatedKnowledgeData,
} from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { CreateKnowledgeButton } from "@/components/app/knowledge/create-knowledge-button"
import { KnowledgeItemList } from "@/components/app/knowledge/knowledge-item-list"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Pengetahuan",
  description: "Pengetahuan yang tersedia di e-learning",
}

export default async function KnowledgePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const KNOWLEDGE_PAGE_LIMIT = 1000
  const KNOWLEDGE_PAGE_SIZE = 1

  const dataKnowledge = getPaginatedKnowledgeData({
    limit: KNOWLEDGE_PAGE_LIMIT,
    page: KNOWLEDGE_PAGE_SIZE,
    token: user?.token,
  })

  const dataCategory = getAllCategoriesData({
    token: user?.token,
  })

  const [knowledgeResp, categoryResp] = await Promise.all([
    dataKnowledge,
    dataCategory,
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
            item={item}
            category={categoryResp}
            token={user?.token}
          />
        ))}
      </div>
    </DashboardShell>
  )
}
