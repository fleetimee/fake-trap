import Link from "next/link"
import { CtaSection } from "@/containers/home-page/cta-section"
import { FeatureSection } from "@/containers/home-page/feature-section"
import { FeaturedModule } from "@/containers/home-page/featured-module"
import { HeroSection } from "@/containers/home-page/hero-section"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Variants } from "framer-motion"

import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getPublicCategories } from "@/lib/fetcher/category-fetcher"
import { getPublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getNavbar } from "@/lib/fetcher/navbar-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { CategoryCard } from "@/components/cards/category-card"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { VelocityScroll } from "@/components/scroll-based-velocity"
import { ScrollToTopButton } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "BPD E-learning: Pelajari apa saja, kapan saja, di mana saja",
  description: "fleetime",
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

const childVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

export default async function IndexPage() {
  const user = await getCurrentUser()

  const categoryNav = await getNavbar()

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

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const isMoreThanOneRole = tokenExtracted
    ? tokenExtracted.role.length > 1
    : false

  return (
    <>
      <SiteHeader
        user={user}
        displayName={loggedOnUser?.data?.name ?? "No User"}
        emailName={loggedOnUser?.data?.email ?? "No Email"}
        isMoreThanOneRole={isMoreThanOneRole ?? false}
        sidebarNavItems={[]}
        topNavItems={categoryNav.data}
      />
      <HeroSection />
      <FeatureSection />
      <CtaSection />
      <FeaturedModule categoryResponse={publicCategoryResp} />

      {/* Velocity Scroll */}
      <section
        id="parallax-text"
        aria-labelledby="parallax-text-heading"
        className="mx-auto hidden max-w-full  lg:min-h-[40svh]  2xl:block "
      >
        <VelocityScroll />
      </section>

      {/* Featured Knowledge */}
      <section
        id="featured-knowledge"
        aria-labelledby="featured-knowledge-heading"
        className="mx-auto max-w-screen-xl space-y-4 px-4 py-16  sm:px-6 md:space-y-16 lg:px-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="flex-1 font-heading text-2xl font-medium sm:text-3xl">
              Materi Terbaru
            </h2>
            <p className="max-w-[46rem] text-balance leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Materi terbaru pilihan yang tersedia di BPD DIY Elearning
            </p>
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="hidden sm:flex" asChild>
              <Link href={"intro/knowledge/all"}>
                Lihat Semua
                <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
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

          <Button
            variant="ghost"
            className="mx-auto flex w-full sm:hidden"
            asChild
          >
            <Link href={"intro/knowledge/all"}>
              Lihat Semua
              <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <ScrollToTopButton />
      <SiteFooter className="border-t" />
    </>
  )
}
