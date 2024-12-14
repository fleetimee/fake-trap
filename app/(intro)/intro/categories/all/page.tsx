import { getPublicCategories } from "@/lib/fetcher/category-fetcher"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { PublicCategories } from "@/components/public-categories"
import { Shell } from "@/components/shell/lobby-shell"

export const metadata = {
  title: "Semua Modul",
  description: "Explore our products and services.",
}

interface AllPublicCategoriesProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AllPublicCategories({
  searchParams,
}: AllPublicCategoriesProps) {
  const { page, per_page, sort, search } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const searchInitial = typeof search === "string" ? search : ""

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const publicCategoryResp = await getPublicCategories({
    limit: limitInitial,
    page: pageInitial,
    sortBy: sortBy,
    orderBy: orderBy,
    searchQuery: searchInitial,
  })

  return (
    <Shell>
      <BreadCrumbs
        isWhiteText
        segments={[
          {
            href: "/",
            title: "Frontpage",
          },
          {
            title: "Semua Modul",
            href: `/intro/categories/all`,
          },
        ]}
      />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <PublicCategories
          isWhiteText={false}
          categories={publicCategoryResp.data}
          pageCount={publicCategoryResp.totalPage}
        />
      </div>
    </Shell>
  )
}
