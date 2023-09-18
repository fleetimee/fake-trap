import Image from "next/image"
import Link from "next/link"
import { Variant, Variants } from "framer-motion"
import Balance from "react-wrap-balancer"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { PublicKnowledgeCard } from "@/components/app/public-knowledge/ui"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell/lobby-shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

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

  const parentVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.5 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  }

  const parentTagVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const tagVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <Shell as="div" className="gap-16 ">
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Kategori
            </h2>
          </MotionDiv>
          <Balance className="text-muted-foreground max-w-[46rem] leading-normal sm:text-lg sm:leading-7">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Jelajahi kategori pengetahuan yang tersedia di dalam e-learning
              ini.
            </MotionDiv>
          </Balance>
        </div>
        <MotionDiv
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={parentVariants}
          initial="initial"
          animate="animate"
        >
          {publicCategoryResp.data.map((category) => (
            <MotionDiv
              variants={childrenVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category.id_category}
              className="group relative overflow-hidden rounded-md border"
            >
              <Link
                key={category.id_category}
                href={`/intro/categories/${category.id_category}`}
              >
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/75" />
                  <div
                    className="h-full rounded-t-md border-b"
                    style={getRandomPatternStyle(
                      String(category.category_name)
                    )}
                  />
                </AspectRatio>
                <div className="absolute inset-4 z-20 flex flex-col">
                  <div className="flex items-start justify-between space-x-4">
                    <div
                      className={cn(
                        buttonVariants({
                          size: "icon",
                          className:
                            "pointer-events-none h-8 w-8 bg-zinc-100 text-zinc-950",
                        })
                      )}
                      aria-hidden="true"
                    >
                      <Icons.category className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-zinc-200">1 items</p>
                  </div>
                  <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
                    {category.category_name}
                  </h3>
                </div>
                <span className="sr-only">{category.category_name}</span>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>

      <MotionDiv
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4 pb-4"
        variants={parentTagVariants}
        initial="initial"
        animate="animate"
      >
        {publicCategoryAll.data.map((category) => (
          <MotionDiv
            variants={tagVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={category.id_category}
          >
            <Link
              key={category.id_category}
              href={`/intro/categories/${category.id_category}`}
            >
              <Badge variant="secondary" className="rounded px-3 py-1">
                {category.category_name}
              </Badge>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>

      <section
        id="featured-knowledge"
        aria-labelledby="featured-knowledge-heading"
        className="space-y-16"
      >
        <div className="flex items-center">
          <h2 className="font-heading flex-1 text-2xl font-medium sm:text-3xl">
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
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
              key={knowledge.id_knowledge}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <PublicKnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
              />
            </MotionDiv>
          ))}
        </div>
      </section>
    </Shell>
  )
}
