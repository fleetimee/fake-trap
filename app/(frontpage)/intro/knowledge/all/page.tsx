import { KnowledgeListRes } from "@/types/knowledge/res"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

import { KnowledgeWrapper } from "./_components/knowledge-wrapper"

export const metadata = {
  title: "Semua Pengetahuan",
  description: "fleetime",
}

interface GetPublicKnowledgeProps {
  page: number
  limit: number
  searchQuery?: string
  sortField?: string
  sortOrder?: string
  status?: string
}

async function getPublicKnowledge({
  page,
  limit,
  searchQuery = "",
  sortField = "created_at",
  sortOrder = "desc",
  status = "0052",
}: GetPublicKnowledgeProps): Promise<KnowledgeListRes> {
  const publicKnowledge = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge/?page=${page}&limit=${limit}&sortBy=${sortField}&orderBy=${sortOrder}&searchQuery=${searchQuery}&status=${status}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await publicKnowledge.json()
}

interface AllPublicKnowledgeProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AllPublicKnowledge({
  searchParams,
}: AllPublicKnowledgeProps) {
  const { page, per_page, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8

  const publicKnowledgeResp = await getPublicKnowledge({
    page: pageInitial,
    limit: limitInitial,
  })

  return (
    <Shell>
      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Explore",
          },
          {
            title: "Semua Pengetahuan",
            href: `/intro/knowledge/all`,
          },
        ]}
      />

      <KnowledgeWrapper
        knowledges={publicKnowledgeResp.data}
        pageCount={publicKnowledgeResp.totalPage}
      />
    </Shell>
  )
}
