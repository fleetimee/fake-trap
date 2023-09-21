import { redirect } from "next/navigation"
import { Terminal } from "lucide-react"

import { CategoryOneRes } from "@/types/category/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { PublicKnowledgeDetailShell } from "@/components/app/public-knowledge/detail/ui"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface MemberKnowledgeDetailPageProps {
  params: {
    detail: string
  }
}

interface GetOneKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const knowledgeOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await knowledgeOne.json()
}

interface GetOneCategoryProps {
  token: string | undefined
  idCategory: number
}

async function getOnePublicCategory({
  token,
  idCategory,
}: GetOneCategoryProps): Promise<CategoryOneRes> {
  const categoryOnePublic = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await categoryOnePublic.json()
}

export async function generateMetadata({
  params,
}: MemberKnowledgeDetailPageProps) {
  const user = await getCurrentUser()

  const getOneKnowledgeResp = await getOneKnowledge({
    token: user?.token,
    idKnowledge: parseInt(params.detail),
  })

  return {
    title: getOneKnowledgeResp.data.knowledge_title,
  }
}

export default async function MemberKnowledgeDetailPage({
  params,
}: MemberKnowledgeDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailKnowledge = await getOneKnowledge({
    idKnowledge: parseInt(params.detail),
    token: user?.token,
  })

  const [detailKnowledgeRes] = await Promise.all([detailKnowledge])

  const detailCategory = await getOnePublicCategory({
    idCategory: detailKnowledgeRes.data.id_category,
    token: user?.token,
  })

  console.log(detailCategory)

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
            title: "Knowledge",
          },
          {
            href: `/member-area/category/${detailCategory.data.id_category}`,
            title: detailCategory.data.category_name,
          },
          {
            href: `/member-area/knowledge/${detailKnowledgeRes.data.id_knowledge}`,
            title: detailKnowledgeRes.data.knowledge_title,
          },
        ]}
      />

      <div className="flex flex-row gap-4 px-2">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>

      <PublicKnowledgeDetailShell detailKnowledge={detailKnowledgeRes} />
    </DashboardShell>
  )
}
