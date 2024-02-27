import React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getCategoryKnowledge,
  getOneCategory,
} from "@/lib/fetcher/category-fetcher"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"

interface DetailCategoryProps {
  params: {
    idCategory: string
  }
}

export async function generateMetadata({ params }: DetailCategoryProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getOneCategory({
    idCategory: params.idCategory,
    token: user?.token,
  })

  return {
    title: category.data.category_name,
  }
}

export default async function DetailCategory({ params }: DetailCategoryProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledges = await getCategoryKnowledge({
    idCategory: params.idCategory,
    page: 1,
    limit: 10,
    token: user?.token,
    sortBy: "created_at",
    orderBy: "desc",
    searchQuery: "",
  })

  return (
    <div
      className="
        flex flex-col gap-4
    "
    >
      <h1
        className="text-lg font-semibold
            leading-relaxed text-gray-700
      "
      >
        Berikut adalah pengetahuan yang tersedia di modul ini :
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {knowledges.data.map((knowledge) => (
            <KnowledgeCard
              key={knowledge.id_knowledge}
              knowledge={knowledge}
              link={`/peserta/knowledge/detail/${knowledge.id_knowledge}`}
            />
          ))}
        </React.Suspense>
      </div>
    </div>
  )
}
