import Link from "next/link"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"
import { generateFromString } from "generate-avatar"
import { CheckCircle2, PartyPopper } from "lucide-react"
import { Button } from "react-day-picker"

import { userAreaRole } from "@/config/dashboard"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn, convertDatetoString, extractToken } from "@/lib/utils"
import {
  DashboardCategoryCardCount,
  DashboardCourseCardCount,
  DashboardKnowledgeCardCount,
} from "@/components/app/dashboard/ui/cards"
import { DashboardKnowledgeHighlight } from "@/components/app/dashboard/ui/highlight"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "User Area",
}

export default async function MemberAreaPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const dateNow = convertDatetoString(new Date().toString())

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  const parentVariant: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  }

  const childrenVariantTwo: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.5 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
        delay: 0.2,
      },
    },
  }

  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="User Area" description={dateNow} />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Alert>
          <PartyPopper className="h-5 w-5" />
          <AlertTitle>
            Halo,{" "}
            <span className="font-heading uppercase text-primary">
              {userExtracted.username}
            </span>
          </AlertTitle>
          <AlertDescription>
            Have a Nice{" "}
            <span className="font-heading uppercase">{getDayWithText}</span> !
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">
              Anda login sebagai :{" "}
              <span className="font-light underline">
                {userAreaRole.roleName}
              </span>
            </CardTitle>

            <CardDescription>{userAreaRole.roleDescription}</CardDescription>
          </CardHeader>

          <ul className="flex flex-col gap-4 px-6 pb-6">
            {userAreaRole.features.map((feature) => (
              <div className="flex flex-col gap-1">
                <li key={feature.title} className="flex items-center">
                  <CheckCircle2 className="mr-4 h-6 w-6 fill-primary text-primary-foreground" />
                  {feature.title}
                </li>
                <li key={feature.title} className="flex items-center">
                  <CheckCircle2 className="relative mr-4 hidden h-6 w-6 fill-primary text-primary-foreground" />
                  <p className={cn("text-xs", "px-10 font-light")}>
                    {feature.description}
                  </p>
                </li>
              </div>
            ))}
          </ul>
        </Card>
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardKnowledgeCardCount token={user.token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardCategoryCardCount token={user.token} />
        </MotionDiv>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="child h-full" variants={childrenVariantTwo}>
          <DashboardKnowledgeHighlight token={user.token} />
        </MotionDiv>

        <MotionDiv
          variants={childrenVariantTwo}
          className="child h-full min-h-[10rem] w-full"
        >
          <Card className="flex h-full min-h-[10rem] w-full flex-col justify-between space-y-2 shadow-md hover:bg-accent hover:text-accent-foreground">
            <CardHeader>
              <CardTitle>Detail Profilmu</CardTitle>
              <CardDescription>
                Klik tombol di bawah ini untuk melihat detail profil kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="container mx-auto flex flex-col items-center justify-center gap-8">
              <Avatar className="h-28 w-28">
                <AvatarImage
                  src={`data:image/svg+xml;utf8,${generateFromString(
                    userExtracted.username
                  )}`}
                />
                <AvatarFallback />
              </Avatar>
              <div className="flex flex-col items-center justify-center gap-1 ">
                <span className=" text-xl font-semibold">
                  {userExtracted.username}
                </span>
                <span className=" text-sm font-semibold">
                  {userExtracted.email}
                </span>
              </div>
              <Link
                href="/dashboard/me"
                className={buttonVariants({
                  size: "default",
                  className: "w-full",
                })}
              >
                Lihat Detail Profil
              </Link>
            </CardContent>
          </Card>
        </MotionDiv>
      </MotionDiv>
    </DashboardShell>
  )
}
