import Image from "next/image"
import Link from "next/link"

import { ElearningHero } from "@/components/elearning-hero"
import { Icons } from "@/components/icons"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
import { Button, buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  return (
    <>
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
      <ElearningHero />
      <div className="items-center justify-center space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0 lg:justify-start">
        <Link
          href="/login"
          className={buttonVariants({
            size: "lg",
            variant: "default",
            className: "w-full sm:w-auto sm:min-w-[10rem]",
          })}
        >
          Mulai
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
              <Icons.arrowRight className="size-5" />
            </span>
            Fitur
          </Button>
        </ScrollIntoViewButton>
      </div>
    </>
  )
}
