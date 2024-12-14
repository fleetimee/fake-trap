import React from "react"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { BookOpenIcon } from "lucide-react"

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

  if (category.code === 400) {
    return notFound()
  }

  return {
    title: category.data.category_name,
  }
}

export default async function DetailCategory({ params }: DetailCategoryProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [category, knowledges] = await Promise.all([
    getOneCategory({
      idCategory: params.idCategory,
      token: user?.token,
    }),
    getCategoryKnowledge({
      idCategory: params.idCategory,
      page: 1,
      limit: 10,
      token: user?.token,
      sortBy: "created_at",
      orderBy: "desc",
      searchQuery: "",
    }),
  ])

  return (
    <div className="flex flex-col gap-6">
      {/* Category Header with Image */}
      <div className="relative h-[300px] overflow-hidden rounded-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.data.image}`}
          alt={category.data.category_name}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="mb-2 text-2xl font-bold text-white">
            {category.data.category_name}
          </h1>
        </div>
      </div>

      {knowledges.data.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold leading-relaxed text-gray-700">
            Berikut adalah materi yang tersedia di modul ini:
          </h2>

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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50 py-16">
          <BookOpenIcon className="mb-4 size-16 text-blue-400" />
          <h2 className="mb-2 text-xl font-semibold text-blue-900">
            Belum Ada Materi
          </h2>
          <p className="text-center text-blue-700">
            Materi untuk kategori ini sedang dalam proses pengembangan.
            <br />
            Silakan cek kembali nanti.
          </p>
        </div>
      )}
    </div>
  )
}
