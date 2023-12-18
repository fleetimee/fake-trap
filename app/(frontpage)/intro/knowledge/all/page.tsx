import { KnowledgeListRes } from "@/types/knowledge/res"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { PublicKnowledges } from "@/components/public-knowledges"
import { Shell } from "@/components/shell/lobby-shell"

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
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortField) {
    url.searchParams.append("sortBy", sortField.toString())
  }

  if (sortOrder) {
    url.searchParams.append("orderBy", sortOrder.toString())
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery.toString())
  }

  if (status) {
    url.searchParams.append("status", status.toString())
  }

  const publicKnowledge = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
    },
    cache: "no-store",
  })
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
  const { page, per_page, sort, search } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const searchInitial = typeof search === "string" ? search : ""

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const publicKnowledgeResp = await getPublicKnowledge({
    page: pageInitial,
    limit: limitInitial,
    sortField: sortBy,
    sortOrder: orderBy,
    searchQuery: searchInitial,
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

      <PublicKnowledges
        knowledges={publicKnowledgeResp.data}
        pageCount={publicKnowledgeResp.totalPage}
      />
    </Shell>
  )
}
