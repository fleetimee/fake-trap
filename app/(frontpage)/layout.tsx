import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import NotFoundModel from "@/public/images/not-found-model-original.png"
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
import BlurFade from "@/components/blur-fade"
import { CategoryCard } from "@/components/cards/category-card"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { ScrollToTopButton } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  // title: "B-LIVE: Pelajari apa saja, kapan saja, di mana saja",
  title: {
    default: "B-LIVE: Pelajari apa saja, kapan saja, di mana saja",
    template: "%s | B-LIVE",
  },
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

interface IndexLayoutProps {
  children: React.ReactNode
}

export default async function IndexLayout({ children }: IndexLayoutProps) {
  const user = await getCurrentUser()

  console.log("user", user)
  const isLoggedOn = user !== undefined

  console.log("isLoggedOn", isLoggedOn)

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

  console.log("loggedOnUser", loggedOnUser)

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
          <div className="flex flex-col-reverse items-center gap-x-12 py-20 sm:px-4 md:px-0 lg:flex-row">
            <div className="flex-1 py-16 sm:mb-0 lg:block">
              {/* Image component */}
              {/* <Image
                src={NotFoundModel}
                className="h-fit rounded-lg sm:block md:max-w-lg lg:scale-125"
                alt=""
                width={1100}
                height={1100}
              /> */}

              <BlurFade delay={0.25} inView>
                <Image
                  src="/images/cta-one.png"
                  className="h-fit rounded-lg sm:block md:max-w-lg lg:scale-125"
                  alt=""
                  width={1200}
                  height={2000}
                />
              </BlurFade>
            </div>

            <div className="mt-6 max-w-xl space-y-3 px-4 sm:px-0 md:mt-0 lg:max-w-2xl">
              {/* Content here */}
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* <ElearningParallax /> */}

      {/* <div className="hidden overflow-hidden md:flex md:flex-col">
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
      </div> */}

      {/* Feature section */}
      {isLoggedOn && (
        <section
          className="relative flex h-auto min-h-screen flex-col lg:min-h-[100svh]"
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
      )}

      {/* Categories section */}
      {isLoggedOn && (
        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="space-y-6 bg-[url(/second_bg.svg)] bg-cover bg-right-bottom bg-no-repeat py-16 lg:min-h-[60svh]"
        >
          <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-8 sm:px-6 md:space-y-16 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="max-w-[58rem] flex-1 space-y-1  md:bg-none">
                <h2 className="flex-1 font-heading text-2xl font-medium  sm:text-3xl md:bg-none">
                  Modul Populer
                </h2>
                <p className="max-w-[46rem] text-balance leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  Modul populer yang tersedia di BPD DIY Elearning, yang sudah
                  di akses oleh banyak pengguna
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
                <Link href={"intro/categories/all"}>
                  Lihat Semua
                  <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
            </MotionDiv>
          </div>
        </section>
      )}

      {/* Velocity Scroll */}
      {isLoggedOn && (
        <section
          id="parallax-text"
          aria-labelledby="parallax-text-heading"
          className="mx-auto max-w-screen-xl items-center px-6 lg:min-h-[10svh] 2xl:block"
        >
          <Card className="mx-auto flex h-11 items-center justify-center bg-gradient-to-r from-blue-700 to-blue-900">
            {/* @ts-ignore */}
            <marquee behavior="" direction="">
              <p className="text-white">
                Learning Management System | Bank BPD DIY | Kita Berkembang
                Bersama | Call Center 1500061{" "}
              </p>
              {/* @ts-ignore */}
            </marquee>
          </Card>
        </section>
      )}

      {/* Featured Knowledge */}
      {isLoggedOn && (
        <section
          id="featured-knowledge"
          aria-labelledby="featured-knowledge-heading"
          className="mx-auto max-w-screen-xl space-y-4 px-4 py-16 sm:px-6 md:space-y-16 lg:px-8"
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
      )}

      <ScrollToTopButton />
      <SiteFooter className="border-t" />
    </section>
  )
}
