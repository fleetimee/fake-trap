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

  const { page, per_page, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 9

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await getCategoriesWithKnowledge({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    searchQuery: "",
  })

  return (
    <Categories categories={categories.data} pageCount={categories.totalPage} />
  )
}
