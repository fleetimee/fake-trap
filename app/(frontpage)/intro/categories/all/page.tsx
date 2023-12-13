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
  page = 1,
  limit = 1000,
  sortField = "created_at",
  sortOrder = "desc",
  searchQuery = "",
}: GetPublicCategoryV2Props): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/public/category?limit=${limit}&page=${page}&sortBy=${sortField}&orderBy=${sortOrder}&searchQuery=${searchQuery}`

  const res = await fetch(url, {
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
  const { page, per_page, store_page, search } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8

  const searchInitial = typeof search === "string" ? search : ""

  const publicCategoryResp = await getPublicCategories({
    limit: limitInitial,
    page: pageInitial,
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
