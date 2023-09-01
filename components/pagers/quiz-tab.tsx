"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuizTabProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  quizId: string
}

export function QuizTab({ className, quizId, ...props }: QuizTabProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      title: "Overview",
      href: `/dashboard/quiz/${quizId}`,
    },
    {
      title: "Soal",
      href: `/dashboard/quiz/${quizId}/soal`,
    },
    {
      title: "Peserta",
      href: `/dashboard/quiz/${quizId}/peserta`,
    },
    {
      title: "Hasil",
      href: `/dashboard/quiz/${quizId}/hasil`,
    },
  ]

  return (
    <Tabs
      {...props}
      className={cn("w-full overflow-x-auto", className)}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              pathname === tab.href && "bg-background text-foreground shadow-sm"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
