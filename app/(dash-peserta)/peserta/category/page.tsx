import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCategoriesWithKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Categories } from "@/components/categories"

export const metadata: Metadata = {
  title: "Kategori",
}

interface PesertaCategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PesertaCategoryPage({
  searchParams,
}: PesertaCategoryPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 9

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await getCategoriesWithKnowledge({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    searchQuery: "",
    orderBy: orderBy,
    sortBy: sortBy,
  })

  return (
    <Categories categories={categories.data} pageCount={categories.totalPage} />
  )
}
