import { CategoryListRes } from "@/types/category/res"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

import { CategoryWrapper } from "./_components/category-wrapper"

export const metadata = {
  title: "Semua Kategori",
  description: "Explore our products and services.",
}

interface GetPublicCategoryV2Props {
  page: number
  limit: number
  searchQuery?: string
  sortField?: string
  sortOrder?: string
}

async function getPublicCategories({
  page,
  limit,
  sortField = "created_at",
  sortOrder = "desc",
  searchQuery = "",
}: GetPublicCategoryV2Props): Promise<CategoryListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/public/category`

  let url = new URL(baseUrl)

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (page) {
    url.searchParams.append("page", page.toString())
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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
    },
    cache: "no-store",
  })
  return await res.json()
}

interface AllPublicCategoriesProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AllPublicCategories({
  searchParams,
}: AllPublicCategoriesProps) {
  const { page, per_page, sort, store_page, search } = searchParams

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
            title: "Semua Kategori",
            href: `/intro/categories/all`,
          },
        ]}
      />

      <CategoryWrapper
        categories={publicCategoryResp.data}
        pageCount={publicCategoryResp.totalPage}
      />
    </Shell>
  )
}
