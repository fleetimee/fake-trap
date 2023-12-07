import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCategoriesWithKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { CategoryCard } from "@/components/category-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { CategoryCardSkeleton } from "@/components/skeletons/category-card-skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserCategoryWrapper } from "@/app/(dashboard-user)/member-area/category/_components"

export const metadata: Metadata = {
  title: "Kategori",
}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default async function PesertaCategoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await getCategoriesWithKnowledge({
    token: user?.token,
    limit: 999,
    page: 1,
    searchQuery: "",
  })

  return (
    <div className="xs:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <React.Suspense
        fallback={Array.from({ length: 8 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      >
        {categories.data.map((category) => (
          <CategoryCard
            category={category}
            key={category.id_category}
            link={`/peserta/category/detail/${category.id_category}`}
          />
        ))}
      </React.Suspense>
    </div>
  )
}
