"use client"

import React from "react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Variants } from "framer-motion"

import { cn } from "@/lib/utils"

import { MotionDiv } from "../framer-wrapper"

interface ApproveCourseTabs
  extends React.ComponentPropsWithoutRef<typeof Tabs> {}

export function ApproveKnowledgeTabs({
  className,
  ...props
}: ApproveCourseTabs) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: "Overview",
      href: `/supervisor-area/approval/approve-knowledge`,
      isActive: segment === null,
    },
    {
      title: "Pending",
      href: `/supervisor-area/approval/approve-knowledge/pending`,
      isActive: segment === "pending",
    },
    {
      title: "Approved",
      href: `/supervisor-area/approval/approve-knowledge/approved`,
      isActive: segment === "approved",
    },
    {
      title: "Rejected",
      href: `/supervisor-area/approval/approve-knowledge/rejected`,
      isActive: segment === "rejected",
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
    </Tabs>
  )
}
