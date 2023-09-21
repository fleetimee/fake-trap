import Link from "next/link"
import { Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { MarketingCard } from "@/components/marketing-card"
import { VelocityScroll } from "@/components/scroll-based-velocity"
import { buttonVariants } from "@/components/ui/button"

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

  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader user={user} />
        <div className="gap-12  ">
          <section className="space-y-6  py-12 md:pt-10 lg:pt-24">
            <div className="mx-auto flex max-w-[58rem] animate-fade-up flex-col items-center py-2 text-center">
              <Link href="/" className="hidden items-center space-x-2 md:flex">
                <Icons.logo
                  className="h-12 w-12 text-primary"
                  aria-hidden="true"
                />
                <span className="hidden text-4xl font-semibold text-primary sm:inline-block">
                  {siteConfig.name}
                </span>
              </Link>

              <p
                className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
                style={{
                  animationDelay: "0.30s",
                  animationFillMode: "forwards",
                }}
              >
                <Balancer>
                  E Learning ini berisi materi-materi yang berkaitan dengan
                  pengetahuan umum dan berisi kursus yang dapat diikuti oleh
                  pengguna.
                </Balancer>
              </p>

              {user ? (
                <MotionDiv
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2 py-2"
                >
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "lg",
                      variant: "default",
                    })}
                  >
                    <span className="mr-2">
                      <Icons.arrowRight className="h-4 w-4" />
                    </span>
                    ENTER APP
                  </Link>
                </MotionDiv>
              ) : null}
            </div>

            <MarketingCard
              parentVariant={parentVariant}
              childVariant={childVariant}
            />
          </section>
        </div>
      </div>
      <SiteFooter className="border-t" />
    </>
  )
}
