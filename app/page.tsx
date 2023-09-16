import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { marketingFeatures } from "@/config/marketing-feature"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
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

export default async function IndexPage() {
  const user = await getCurrentUser()

  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader user={user} />
        <div className="gap-12  ">
          <section
            id="hero"
            aria-labelledby="hero-heading"
            className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 rounded-md pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
          >
            <h1
              className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
              style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
              <Balancer>Pelajari apa saja, kapan saja, di mana saja</Balancer>
            </h1>
            <p
              className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <Balancer>
                BPD E-learning adalah platform pembelajaran online yang
                menyediakan berbagai macam materi yang dapat diakses oleh
                pengguna.
              </Balancer>
            </p>
            <div className="flex gap-4">
              <Link
                href={"/intro/"}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "default" })}
              >
                <p className="font-bold">Explore</p>
              </Link>
              <Link
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                replace
                prefetch={false}
                className={buttonVariants({ variant: "outline" })}
              >
                <p className="font-bold">{user ? "Enter" : "Authenticate"}</p>
              </Link>
            </div>
          </section>

          <section className="space-y-6  py-12 md:pt-10 lg:pt-24">
            <div className="mx-auto flex max-w-[58rem] animate-fade-up flex-col items-center  border-t py-2 text-center">
              <h2 className="pt-4 text-center font-heading text-3xl font-bold md:text-4xl">
                What's included?
              </h2>

              <p className="pb-8 pt-4 text-center text-lg">
                <Balancer>
                  E Learning ini berisi materi-materi yang berkaitan dengan
                  pengetahuan umum dan berisi kursus yang dapat diikuti oleh
                  pengguna.
                </Balancer>
              </p>
            </div>

            <div className="container mx-auto my-16 w-full max-w-screen-lg animate-fade-up place-items-center items-center justify-center gap-5  p-5 xl:px-0">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {marketingFeatures.map((feature) => (
                  <Card key={feature.title} className={cn("p-2")}>
                    <CardHeader>{feature.icon}</CardHeader>
                    <CardContent className="space-y-2">
                      <CardTitle className="font-heading">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {feature.body}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <SiteFooter className="border-t" />
    </>
  )
}
