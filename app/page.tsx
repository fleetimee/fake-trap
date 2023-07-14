import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { buttonVariants } from "@/components/ui/button"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { LottieAnimation } from "@/components/lottie-animation"

export const metadata = {
  title: "BPD E-learning: Pelajari apa saja, kapan saja, di mana saja",
  description: "fleetime",
}

export default async function IndexPage() {
  const user = await getCurrentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container flex flex-col justify-between py-24 md:flex-row">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              E-learning BPD DIY memberikan anda{" "}
              <br className="hidden sm:inline" />
              akses ke ribuan kursus online
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Pelajari apa saja, kapan saja, di mana saja
            </p>
            <pre className="text-sm text-muted-foreground"></pre>
          </div>
          <div className="flex gap-4">
            <Link
              href={"/intro/"}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Lihat Preview
            </Link>
            <Link
              rel="noreferrer"
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              {user ? "Masuk Panel" : "Akses App"}
            </Link>
          </div>
        </section>
        <LottieAnimation />
      </div>
      <SiteFooter />
    </div>
  )
}
