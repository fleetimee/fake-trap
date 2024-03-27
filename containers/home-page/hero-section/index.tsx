import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
import { Button, buttonVariants } from "@/components/ui/button"

interface HeroSectionProps {}

/**
 * Renders the hero section of the home page.
 *
 * @param {HeroSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered hero section.
 */
export function HeroSection({}: HeroSectionProps) {
  return (
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
                className="size-auto "
                alt=""
              />
            </div>
            <p className="text-3xl font-semibold text-white sm:text-4xl">
              Learning Management System
            </p>
            <p className="mt-3 text-white">
              Dapatkan materi dan keterampilan yang Anda butuhkan untuk sukses
              dengan BPD DIY Learning Management System
            </p>
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
  )
}
