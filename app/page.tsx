import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getPublicCategories } from "@/lib/fetcher/category-fetcher"
import { getPublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getNavbar } from "@/lib/fetcher/navbar-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { CategoryCard } from "@/components/cards/category-card"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { MarketingCard } from "@/components/cards/marketing-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { VelocityScroll } from "@/components/scroll-based-velocity"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
import { ScrollToTopButton } from "@/components/scroll-to-top"
import { Button, buttonVariants } from "@/components/ui/button"

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
    <section className="">
      <SiteHeader
        user={user}
        displayName={loggedOnUser?.data?.name ?? "No User"}
        emailName={loggedOnUser?.data?.email ?? "No Email"}
        isMoreThanOneRole={isMoreThanOneRole ?? false}
        sidebarNavItems={[]}
        topNavItems={categoryNav.data}
      />

      <section className="bg-[url(/hero_bg.svg)] bg-cover bg-bottom py-14 md:bg-left lg:min-h-[100svh]">
        <div className="mx-auto max-w-screen-xl md:px-8 lg:h-screen">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              {/* <img
                src="/images/cta-one.png"
                className="sm:rounded-lg md:max-w-lg"
                alt=""
              /> */}

              <Image
                src="/images/cta-one.png"
                className="hidden scale-125 rounded-lg transition-all duration-150 ease-in-out sm:block md:max-w-lg"
                alt=""
                width={1200}
                height={1200}
              />
            </div>
            <div className="mt-6 max-w-xl space-y-3 px-4 sm:px-0 md:mt-0 lg:max-w-2xl">
              {/* Logo Image */}
              <div className="flex  w-fit  items-center rounded-xl bg-white p-2 shadow-md">
                <Image
                  src="/images/logo.png"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="size-auto "
                  alt=""
                />
              </div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                Learning Management System
              </p>
              <p className="mt-3 text-white">
                Dapatkan materi dan keterampilan yang Anda butuhkan untuk sukses
                dengan BPD DIY Learning Management System
              </p>
              <div className="items-center justify-center space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0 lg:justify-start">
                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "w-full sm:w-auto",
                  })}
                >
                  Get Started
                </Link>

                <ScrollIntoViewButton selector="#feature">
                  <Button
                    className={buttonVariants({
                      size: "lg",
                      variant: "default",
                      className: "w-full sm:w-auto",
                    })}
                  >
                    <span className="mr-2">
                      <Icons.arrowRight className="size-4" />
                    </span>
                    Fitur
                  </Button>
                </ScrollIntoViewButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative flex h-auto min-h-screen flex-col  lg:min-h-[100svh]"
        id="feature"
      >
        <div className="gap-12">
          <section className="space-y-6  py-12 md:pt-10 lg:pt-24">
            <div className="mx-auto flex max-w-[58rem] animate-fade-up flex-col items-center py-2 text-center">
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Fitur
              </h2>

              <p
                className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
                style={{
                  animationDelay: "0.30s",
                  animationFillMode: "forwards",
                }}
              >
                <Balancer>
                  Fitur yang tersedia di dalam e-learning ini dapat membantu
                  Anda untuk mengembangkan pengetahuan dan keterampilan Anda
                  dengan mudah.
                </Balancer>
              </p>
            </div>

            <MarketingCard
              parentVariant={parentVariant}
              childVariant={childVariant}
            />
          </section>
        </div>
      </section>

      <section
        className="relative mx-auto  p-4 md:px-8"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      >
        <div className="mx-auto max-w-screen-xl py-4">
          <div className="relative z-10 items-center gap-5 lg:flex">
            <div className="max-w-lg flex-1 py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
              <h3 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Level Up Your Skills:{" "}
                <span className="text-indigo-600">Game On!</span>
              </h3>
              <p className="mt-3 leading-relaxed text-gray-500">
                adalah platform e-learning online yang bikin belajar jadi seru,
                menantang, dan nggak ngebosenin! Kayak main game aja, eh tapi
                yang ngehasilin ilmu yang berguna loh!
              </p>
              <Link
                className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 font-medium text-indigo-600"
                href="javascript:void()"
              >
                Try it out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 size-6 duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
            <div className="mx-auto mt-5 flex-1 sm:w-9/12 lg:mt-0 lg:w-auto">
              <Image
                src={"/images/promo.png"}
                alt="Promo Image"
                className="rounded-lg shadow-lg"
                width={1200}
                height={1200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* This section is the "Featured Category" section of the page. 
      It displays a list of popular categories in a grid layout. Each category is represented by a card, 
      and there's a button to view all categories. 
      The section has a background image and uses the framer-motion library for animations. */}
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 bg-[url(/second_bg.svg)] bg-cover bg-right-bottom bg-no-repeat py-16  lg:min-h-[60svh]"
      >
        <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-16 sm:px-6 md:space-y-16 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="max-w-[58rem] flex-1 space-y-1  md:bg-none">
              <h2 className="flex-1 font-heading text-2xl font-medium  sm:text-3xl md:bg-none">
                Modul Populer
              </h2>
              <p className="max-w-[46rem] text-balance leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Modul populer yang tersedia di BPD DIY Elearning, yang sudah di
                akses oleh banyak pengguna
              </p>
            </div>

            <Button variant="outline" className="hidden sm:flex" asChild>
              <Link href={"intro/categories/all"}>
                Lihat Semua
                <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <MotionDiv
            className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={parentVariant}
            initial="initial"
            animate="animate"
          >
            {publicCategoryResp.data.map((category) => (
              <MotionDiv
                variants={childVariant}
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

            <Button
              variant="ghost"
              className="col-span-2 mx-auto flex w-full sm:col-auto sm:hidden"
              asChild
            >
              <Link href={"intro/knowledge/all"}>
                Lihat Semua
                <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

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
    </section>
  )
}
