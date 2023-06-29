import Link from "next/link"
import Logger from "js-logger"
import { useSession } from "next-auth/react"

import { Message } from "@/types/hello"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

async function getHello(): Promise<Message> {
  const res = await fetch("http://localhost:1337", {
    method: "GET",
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data = await res.json()

  return data
}

export default async function IndexPage() {
  const data = await getHello()

  Logger.debug(data)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {data.message}
        </p>

        <pre className="text-sm text-muted-foreground"></pre>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          rel="noreferrer"
          href="/login"
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
