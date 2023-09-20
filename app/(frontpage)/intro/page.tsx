import Image from "next/image"
import Link from "next/link"
import { Variant, Variants } from "framer-motion"
import Balance from "react-wrap-balancer"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { CategoryCard } from "@/components/category-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell/lobby-shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"

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
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge?limit=8&page=1&orderBy=desc&sortBy=created_at`,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/category?limit=${limit}&page=${page}$`,
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
  const PUBLIC_CATEGORY_LIMIT = 8
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
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
    <Shell as="div" className="grid gap-60 ">
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
          <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jelajahi kategori pengetahuan yang tersedia di dalam e-learning
              ini.
            </MotionDiv>
          </Balance>
        </div>
        <MotionDiv
          className="flex flex-col items-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button size="lg">
            <Link href="/intro/categories/all">Lihat Semua</Link>
          </Button>
        </MotionDiv>
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
              <CategoryCard
                category={category}
                link={`/intro/categories/${category.id_category}`}
              />
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>

      <section
        id="featured-knowledge"
        aria-labelledby="featured-knowledge-heading"
        className="space-y-16"
      >
        <div className="flex items-center">
          <h2 className="flex-1 font-heading text-2xl font-medium sm:text-3xl">
            Pengetahuan Terbaru
          </h2>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="intro/knowledge/all">
              <div
                className={cn(
                  buttonVariants({
                    size: "lg",
                  })
                )}
              >
                Lihat Semua
                <span className="sr-only">View all products</span>
              </div>
            </Link>
          </MotionDiv>
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
              <KnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
                link={`/intro/knowledge/${knowledge.id_knowledge}`}
              />
            </MotionDiv>
          ))}
        </div>
      </section>
    </Shell>
  )
}
