import Link from "next/link"
import { Variants } from "framer-motion"
import Balance from "react-wrap-balancer"

import { getPublicCategories } from "@/lib/fetcher/category-fetcher"
import { getPublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { cn } from "@/lib/utils"
import { CategoryCard } from "@/components/cards/category-card"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { VelocityScroll } from "@/components/scroll-based-velocity"
import { Shell } from "@/components/shell/lobby-shell"
import { Button, buttonVariants } from "@/components/ui/button"

export const metadata = {
  title: "Explore",
  description: "Explore our products and services.",
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

  const parentVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  }
  return (
    <Shell
      as="div"
      className="grid gap-60 bg-[url(/hero_bg.svg)] bg-contain bg-no-repeat lg:bg-bottom"
    >
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 bg-[url(/second_bg.svg)] bg-cover py-6 md:pt-10 lg:pt-32 "
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
        id="parallax-text"
        aria-labelledby="parallax-text-heading"
        className="mx-auto hidden space-y-6 px-4 2xl:container sm:px-6 lg:px-8 2xl:block "
      >
        <VelocityScroll />
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
