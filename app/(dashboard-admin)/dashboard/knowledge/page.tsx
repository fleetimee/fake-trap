import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateKnowledgeButton } from "@/components/app/knowledge/operations"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, KnowledgeTableShell } from "@/components/shell"





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

interface GetKnowledgeV2Props {
  token: string
  limit: number
  page: number
  sortField?: string
  orderBy?: string
  searchQuery?: string
  visibilityId?: string | string[] | undefined // Add this line
  categoryIds?: string | string[] | undefined // Add this line
  statusCode?: string | string[] | undefined // And this line
}

async function getKnowledgeV2({
  token,
  limit,
  page,
  sortField = "id_knowledge",
  orderBy = "asc",
  searchQuery = "",
  categoryIds = "", // And this line
  visibilityId = "", // And this line
  statusCode = "", // And this line
}: GetKnowledgeV2Props): Promise<KnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/?page=${page}&limit=${limit}&sortBy=${sortField}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  // If categoryIds is provided, add it to the URL
  if (categoryIds) {
    url += `&categoryIds=${categoryIds}`
  }

  if (visibilityId) {
    url += `&visibility=${visibilityId}`
  }

  if (statusCode) {
    url += `&statusCodes=${statusCode}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
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

  const {
    page,
    per_page,
    sort,
    knowledge_title,
    id_category,
    status_text,
    status,
  } = searchParams ?? {}

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
    getKnowledgeV2({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      searchQuery: searchQueryInitial,
      sortField: sortField,
      orderBy: sortOrder,
      categoryIds: id_category, // Add this line
      statusCode: status_text, // Add this line
      visibilityId: status, // Add this line
    }),
    getCategory({ token: user?.token, page: 1, limit: 100 }),
    getKnowledgeVisibility({
      token: user?.token,
      refCode: "003",
    }),
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
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
      </MotionDiv>

      <KnowledgeTableShell
        data={knowledgeResp.data}
        categoryResp={categoryResp}
        referenceResp={referenceResp}
        pageCount={knowledgeResp.totalPage}
      />
    </DashboardShell>
  )
}
