import Image from "next/image"
import Link from "next/link"
import { Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { MarketingCard } from "@/components/cards/marketing-card"
import { Icons } from "@/components/icons"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
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
                  className="h-auto w-auto "
                  alt=""
                />
              </div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                Learning Management System
              </p>
              <p className="mt-3 text-white">
                Dapatkan pengetahuan dan keterampilan yang Anda butuhkan untuk
                sukses dengan BPD DIY Learning Management System
              </p>
              <div className="items-center justify-center space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0 lg:justify-start">
                {/* <a
                  href="javascript:void(0)"
                  className="block w-full rounded-md bg-white px-7 py-3 text-center text-gray-800 shadow-md sm:w-auto"
                >
                  Pelajari Lebih Lanjut
                </a> */}

                <Link
                  href="/login"
                  className="block w-full rounded-md bg-white px-7 py-3 text-center text-gray-800 shadow-md sm:w-auto"
                >
                  Get Started
                </Link>

                <ScrollIntoViewButton selector="#feature">
                  <Button
                    className={buttonVariants({
                      size: "lg",
                      variant: "default",
                    })}
                  >
                    <span className="mr-2">
                      <Icons.arrowRight className="h-4 w-4" />
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
        <div className="gap-12  ">
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

              {/* {user ? (
                <MotionDiv
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2 py-2"
                >
                  <Link
                    href="/login"
                    className={buttonVariants({
                      size: "lg",
                      variant: "default",
                    })}
                  >
                    <span className="mr-2">
                      <Icons.arrowRight className="h-4 w-4" />
                    </span>
                    Masuk ke Dashboard
                  </Link>
                </MotionDiv>
              ) : null} */}
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
              <a
                className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 font-medium text-indigo-600"
                href="javascript:void()"
              >
                Try it out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-6 w-6 duration-150"
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
              </a>
            </div>
            <div className="mx-auto mt-5 flex-1 sm:w-9/12 lg:mt-0 lg:w-auto">
              <img
                src="https://i.postimg.cc/kgd4WhyS/container.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter className="border-t" />
    </section>
  )
}
