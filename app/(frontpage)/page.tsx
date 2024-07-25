import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ElearningHero } from "@/components/elearning-hero"
import { Icons } from "@/components/icons"
import { ScrollIntoViewButton } from "@/components/scroll-into-view"
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
  title: "B-LIVE",
  description: "Pelajari apa saja, kapan saja, di mana saja",
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const { logoutPopout } = searchParams

  console.log(logoutPopout)

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
            variant: "outline",
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
