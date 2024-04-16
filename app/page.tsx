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
import { BentoGridDemo } from "@/components/bento-feature"
import { CategoryCard } from "@/components/cards/category-card"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { ElearningHero } from "@/components/elearning-hero"
import { ElearningParallax } from "@/components/elearning-parallax"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { VelocityScroll } from "@/components/scroll-based-velocity"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
import { ScrollToTopButton } from "@/components/scroll-to-top"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ContainerScroll } from "@/components/ui/container-scroll"
import { HeroHighlight } from "@/components/ui/hero-highlight"
import { MacbookScroll } from "@/components/ui/macbook-scroll"

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
        profilePicture={loggedOnUser?.data?.profile_picture}
      />

      <section className="bg-[url(/hero_bg.svg)] bg-cover bg-bottom py-14 md:bg-left lg:min-h-[100svh]">
        <div className="mx-auto max-w-screen-xl md:px-8 lg:h-screen">
          <div className="items-center gap-x-12 py-20 sm:px-4 md:px-0 lg:flex">
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
                height={2000}
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
              {/* <p className="text-3xl font-semibold text-white sm:text-4xl">
                Learning Management System
              </p>
              <p className="mt-3 text-white">
                Dapatkan materi dan keterampilan yang Anda butuhkan untuk sukses
                dengan BPD DIY Learning Management System
              </p> */}

              <ElearningHero />

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

      <ElearningParallax />

      <div className="hidden overflow-hidden md:flex md:flex-col">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Yuk, Belajar Lebih Seru <br />
                <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                  Dengan E-Learning
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={"/images/promo2.png"}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

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

            {/* <MarketingCard
              parentVariant={parentVariant}
              childVariant={childVariant}
            /> */}

            <BentoGridDemo />
          </section>
        </div>
      </section>

      <div className="hidden w-full overflow-hidden bg-white dark:bg-[#0B0B0F] md:block">
        <MacbookScroll
          title={<span>Belajar Jadi Lebih Mudah dan Menyenangkan.</span>}
          badge={
            <Link href="https://peerlist.io/manuarora">
              <Badge className="size-10 -rotate-12" />
            </Link>
          }
          src={"/images/promo.png"}
          showGradient={false}
        />
      </div>

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
