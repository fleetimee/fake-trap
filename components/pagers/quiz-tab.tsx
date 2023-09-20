"use client"

import React from "react"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Variant, Variants } from "framer-motion"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

import { MotionDiv } from "../framer-wrapper"

interface QuizTabProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  quizId: string
}

export function QuizTab({ className, quizId, ...props }: QuizTabProps) {
  const router = useRouter()
  const pathname = usePathname()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: "Overview",
      href: `/dashboard/quiz/${quizId}`,
      isActive: segment === null,
    },
    {
      title: "Soal Builder",
      href: `/dashboard/quiz/${quizId}/soal`,
      isActive: segment === "soal",
    },
    {
      title: "Preview Soal",
      href: `/dashboard/quiz/${quizId}/preview-soal`,
      isActive: segment === "preview-soal",
    },
    {
      title: "Peserta",
      href: `/dashboard/quiz/${quizId}/peserta`,
      isActive: segment === "peserta",
    },
    {
      title: "Hasil",
      href: `/dashboard/quiz/${quizId}/hasil`,
      isActive: segment === "hasil",
    },
  ]

  const parentVariant: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  }

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="sticky top-0 z-30 h-auto  w-full bg-background px-1"
      onValueChange={(value) => router.push(value)}
    >
      <MotionDiv variants={parentVariant} initial="initial" animate="animate">
        <TabsList className="inline-flex items-center justify-center space-x-1.5 text-muted-foreground">
          {tabs.map((tab) => (
            <MotionDiv
              variants={childrenVariant}
              role="none"
              key={tab.href}
              className={cn(
                "child border-b-2 border-transparent py-1.5",
                tab.isActive && "border-foreground"
              )}
            >
              <TabsTrigger
                value={tab.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  tab.isActive && "text-foreground"
                )}
              >
                {tab.title}
              </TabsTrigger>
            </MotionDiv>
          ))}
        </TabsList>
      </MotionDiv>
      <Separator />
    </Tabs>
  )
}
