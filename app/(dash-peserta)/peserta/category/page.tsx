import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import NotFoundLottie from "@/public/lottie/not-found.json"

import { authOptions } from "@/lib/auth"
import { getCategoriesWithKnowledge } from "@/lib/fetcher/category-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Categories } from "@/components/categories"
import { NotFoundAnim } from "@/components/not-found-anim"

export const metadata: Metadata = {
  title: "Modul",
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

  const { page, per_page, sort, search } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 9

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"
  const searchInitial = typeof search === "string" ? search : ""

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await getCategoriesWithKnowledge({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    searchQuery: searchInitial,
    orderBy: orderBy,
    sortBy: sortBy,
  })

  if (categories.code === 404) {
    return notFound()
  }

  return categories.data.length > 0 ? (
    <Categories categories={categories.data} pageCount={categories.totalPage} />
  ) : (
    <NotFoundAnim
      animationData={NotFoundLottie}
      title="Belum ada Modul"
      description="Tidak ada Modul yang tersedia saat ini. Silahkan coba lagi nanti."
      backButtonUrl="/peserta"
    />
  )
}
