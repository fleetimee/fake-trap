import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseKnowledges } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CourseKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    idCourse: string
  }
}

export default async function CourseKnowledgePage({
  searchParams,
  params,
}: CourseKnowledgePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, search, sort } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8
  const searchInitial = typeof search === "string" ? search : ""

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const knowledges = await getCourseKnowledges({
    token: user?.token,
    idCourse: params.idCourse,
    page: pageInitial,
    limit: 999,
    searchQuery: searchInitial,
    orderBy: orderByInitial,
    sortBy: sortByInitial,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Materi Pelatihan</h3>
        <p className="text-sm text-muted-foreground">
          Berikut adalah daftar materi yang ada di pelatihan ini.
        </p>
      </div>
      <Separator />

      <div className="flex justify-end">
        <Link
          href={`/operator-lms/course/detail/${params.idCourse}/knowledge/new`}
          className={buttonVariants({
            size: "sm",
            className: "flex h-8 w-fit justify-end",
          })}
        >
          <span className=" text-sm font-medium">Tambah Materi</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {knowledges?.data.map((knowledge) => (
            <KnowledgeCard
              key={knowledge.id_knowledge}
              knowledge={knowledge}
              link={`/operator-lms/knowledge/detail/${knowledge.id_knowledge}`}
            />
          ))}
        </React.Suspense>
      </div>
    </div>
  )
}
