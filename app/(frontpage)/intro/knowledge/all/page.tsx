import { getPublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { PublicKnowledges } from "@/components/public-knowledges"
import { Shell } from "@/components/shell/lobby-shell"

export const metadata = {
  title: "Semua Pengetahuan",
  description: "fleetime",
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
        isWhiteText
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
        isWhiteText
      />
    </Shell>
  )
}
