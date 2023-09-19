import Link from "next/link"
import { Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { marketingFeatures } from "@/config/marketing-feature"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { MarketingCard } from "@/components/marketing-card"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
              <p className="pb-8 pt-4 text-center  text-2xl">
                <Balancer>
                  E Learning ini berisi materi-materi yang berkaitan dengan
                  pengetahuan umum dan berisi kursus yang dapat diikuti oleh
                  pengguna.
                </Balancer>
              </p>
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
