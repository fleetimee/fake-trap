import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { getCurrentUser } from "@/lib/session"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { LottieAnimation } from "@/components/lottie-animation"
import { buttonVariants } from "@/components/ui/button"

export const metadata = {
  title: "BPD E-learning: Pelajari apa saja, kapan saja, di mana saja",
  description: "fleetime",
}

export default async function IndexPage() {
  const user = await getCurrentUser()

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader user={user} />
        <div className="gap-12">
          <section
            id="hero"
            aria-labelledby="hero-heading"
            className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 bg-background pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
          >
            <h1
              className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
              style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
              <Balancer>Pelajari apa saja, kapan saja, di mana saja</Balancer>
            </h1>
            <p
              className="animate-fade-up mt-6 text-center text-muted-foreground/80 opacity-0 md:text-xl"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <Balancer>
                Acme Corp is a Next.js starter kit that includes everything you
                need to build a modern web application. Mobile application
                preconfigured, ready to go.
              </Balancer>
            </p>
            <div className="flex gap-4">
              <Link
                href={"/intro/"}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants()}
              >
                Explore
              </Link>
              <Link
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                replace
                prefetch={false}
                className={buttonVariants({ variant: "outline" })}
              >
                {user ? "Masuk Panel" : "Akses App"}
              </Link>
            </div>
          </section>

          <section className="space-y-6 py-6 md:pt-10 lg:pt-24">
            <div className="animate-fade-up mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl">
                What&apos;s included?
              </h2>

              <p className="pb-8 pt-4 text-center text-lg">
                <Balancer>
                  This repo comes fully stacked with everything you need for
                  your enterprise startup. Stop worrying about boilerplate
                  integrations and start building your product today!
                </Balancer>
              </p>
            </div>

            {/*<div className="grid grid-cols-1 gap-5 md:grid-cols-3">*/}
            {/*  {marketingFeatures.map((feature) => (*/}
            {/*    <Card key={feature.title} className={cn("p-2")}>*/}
            {/*      <CardHeader>{feature.icon}</CardHeader>*/}
            {/*      <CardContent className="space-y-2">*/}
            {/*        <CardTitle>{feature.title}</CardTitle>*/}
            {/*        <CardDescription className="mt-2">*/}
            {/*          {feature.body}*/}
            {/*        </CardDescription>*/}
            {/*      </CardContent>*/}
            {/*    </Card>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </section>
        </div>
      </div>
      <SiteFooter className="border-t" />
    </>
  )
}
