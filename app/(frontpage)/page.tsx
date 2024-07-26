import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import BlurFade from "@/components/blur-fade"
import { ElearningHero } from "@/components/elearning-hero"
import { Icons } from "@/components/icons"
import PulsatingButton from "@/components/pulsating-button"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
import ShinyButton from "@/components/shiny-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const metadata: Metadata = {
  title: "BLIVE: BPD DIY Learning Integrated Virtual Education",
  description: "Pelajari apa saja, kapan saja, di mana saja",
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const { logoutPopout } = searchParams

  return (
    <>
      <BlurFade delay={0.25 * 2} inView>
        <div className="flex w-fit items-center rounded-xl bg-white p-2 shadow-md">
          <Image
            src="/images/logo.png"
            layout="responsive"
            width={350}
            height={350}
            className="w-h-28 h-28 sm:h-32 sm:w-32 md:h-48 md:w-48" // Adjust sizes for different screen sizes
            alt="Logo"
          />
        </div>
      </BlurFade>

      <ElearningHero />
      <div className="items-center justify-center space-y-3 pt-10 sm:flex sm:space-x-6 sm:space-y-0 lg:justify-start">
        <Link href="/login">
          <PulsatingButton className="w-full  text-white sm:w-auto sm:min-w-80">
            🚀 Mulai
          </PulsatingButton>
        </Link>

        <ScrollIntoViewButton selector="#feature">
          {/* <Button
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
          </Button> */}
          {/* <PulsatingButton
            pulseColor="#0096ff"
            className="w-full  bg-white sm:w-auto sm:min-w-40"
          >
            Fitur
          </PulsatingButton> */}
          <ShinyButton
            text="🤔 Fitur"
            className=" w-full bg-white  text-white sm:w-auto sm:min-w-40"
          />
        </ScrollIntoViewButton>
      </div>

      <AlertDialog open={Boolean(logoutPopout)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Kamu secara otomatis telah keluar dari akun
            </AlertDialogTitle>
            <AlertDialogDescription>
              Session kamu telah berakhir, silahkan login kembali
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/">
              <AlertDialogAction>Continue</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
