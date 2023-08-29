import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateKnowledgeButton } from "@/components/app/knowledge/operations"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { KnowledgeTableShell } from "@/components/shell/knowledge-table-shell"

export const metadata = {
  title: "Pengetahuan",
  description: "Pengetahuan yang tersedia di e-learning",
}

interface GetKnowledgeVibilityProps {
  refCode: string
  token: string | undefined
}

async function getKnowledgeVisibility({
  token,
  refCode,
}: GetKnowledgeVibilityProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
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
  searchQuery = "",
  sortField = "id_knowledge",
  sortOrder = "asc",
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

interface KnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function KnowledgePage({
  searchParams,
}: KnowledgePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, knowledge_title, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "id_knowledge"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [knowledgeResp, categoryResp, referenceResp] = await Promise.all([
    getKnowledge({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      searchQuery: searchQueryInitial,
      sortField: sortField,
      sortOrder: sortOrder,
    }),
    getCategory({ token: user?.token, page: 1, limit: 100 }),
    getKnowledgeVisibility({
      token: user?.token,
      refCode: "003",
    }),
  ])

  console.log(knowledgeResp.totalPage)

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
          referenceResp={referenceResp}
          token={user?.token}
        />
      </DashboardHeader>
      {/*<div className="divide-y divide-border rounded-md border">*/}
      {/*  {knowledgeResp.data.map((item) => (*/}
      {/*    <KnowledgeItemList*/}
      {/*      key={item.id_knowledge}*/}
      {/*      knowledgeData={item}*/}
      {/*      categoryResponse={categoryResp}*/}
      {/*      token={user?.token}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}

      <KnowledgeTableShell
        data={knowledgeResp.data}
        categoryResp={categoryResp}
        referenceResp={referenceResp}
        pageCount={knowledgeResp.totalPage}
      />
    </DashboardShell>
  )
}
