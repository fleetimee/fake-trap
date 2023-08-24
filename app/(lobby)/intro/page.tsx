import Image from "next/image"
import Link from "next/link"
import Balance from "react-wrap-balancer"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PublicKnowledgeCard } from "@/components/app/public-knowledge/ui"
import { Shell } from "@/components/shell/lobby-shell"

export const metadata = {
  title: "Explore",
  description: "Explore our products and services.",
}

interface GetPublicKnowledgeProps {
  limit: number
  page: number
}

async function getPublicKnowledge({
  limit,
  page,
}: GetPublicKnowledgeProps): Promise<KnowledgeListRes> {
  const publicKnowledge = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await publicKnowledge.json()
}

interface GetPublicCategoriesProps {
  limit: number
  page: number
}

async function getPublicCategories({
  limit,
  page,
}: GetPublicCategoriesProps): Promise<CategoryListRes> {
  const publicCategories = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/category?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await publicCategories.json()
}

export default async function IntroductionPage() {
  const PUBLIC_CATEGORY_LIMIT = 4
  const PUBLIC_CATEGORY_PAGE_SIZE = 1

  const PUBLIC_KNOWLEDGE_LIMIT = 8
  const PUBLIC_KNOWLEDGE_PAGE_SIZE = 1

  const publicKnowledge = getPublicKnowledge({
    limit: PUBLIC_KNOWLEDGE_LIMIT,
    page: PUBLIC_KNOWLEDGE_PAGE_SIZE,
  })

  const publicCategory = getPublicCategories({
    limit: PUBLIC_CATEGORY_LIMIT,
    page: PUBLIC_CATEGORY_PAGE_SIZE,
  })

  const [publicCategoryResp, publicKnowledgeResp] = await Promise.all([
    publicCategory,
    publicKnowledge,
  ])

  const publicCategoryAll = await getPublicCategories({
    limit: 100,
    page: 1,
  })

  return (
    <Shell as="div" className="gap-16">
      <section
        id="introduction"
        aria-labelledby="introduction-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32"
      >
        <h1 className="font-heading text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Explore
        </h1>
        <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Pelajari pengetahuan baru dengan mudah dan menyenangkan.
        </Balance>
        <div className="space-x-4">
          <Link
            href="/login"
            className={cn(
              buttonVariants({
                size: "lg",
              })
            )}
          >
            Masuk Panel
          </Link>
        </div>
      </section>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Kategori
          </h2>
          <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Jelajahi kategori pengetahuan yang tersedia di dalam e-learning ini.
          </Balance>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {publicCategoryResp.data.map((category) => (
            <Link
              href={`intro/categories/${category.id_category}`}
              key={category.id_category}
            >
              <div className="group relative overflow-hidden rounded-md">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src="/images/category-image.jpg"
                    alt="nigga"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                    {category.category_name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4 pb-4"
      >
        {publicCategoryAll.data.map((category) => (
          <Link
            key={category.id_category}
            href={`/intro/categories/${category.id_category}`}
          >
            <Badge variant="secondary" className="rounded px-3 py-1">
              {category.category_name}
            </Badge>
          </Link>
        ))}
      </section>

      <section
        id="featured-knowledge"
        aria-labelledby="featured-knowledge-heading"
        className="space-y-16"
      >
        <div className="flex items-center">
          <h2 className="flex-1 font-heading text-2xl font-medium sm:text-3xl">
            Pengetahuan Unggulan
          </h2>
          <Link href="/products">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                })
              )}
            >
              Lihat Semua
              <span className="sr-only">View all products</span>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {publicKnowledgeResp.data.map((knowledge) => (
            <PublicKnowledgeCard
              key={knowledge.id_knowledge}
              knowledge={knowledge}
            />
          ))}
        </div>
      </section>
    </Shell>
  )
}
