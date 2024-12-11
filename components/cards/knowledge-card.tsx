"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { CategoryOneResKnowledge } from "@/types/category/res"
import { CourseKnowledgeListResData } from "@/types/course/res"
import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface PublicKnowledgeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  knowledge: CategoryOneResKnowledge | CourseKnowledgeListResData
  link: string
}

export function KnowledgeCard({
  knowledge,
  className,
  link,
  ...props
}: PublicKnowledgeCardProps) {
  return (
    <Link href={link} className="group flex h-full">
      <Card
        className={cn(
          "flex w-full flex-col overflow-hidden transition-all duration-200 hover:shadow-md",
          "border-transparent hover:border-primary/50",
          className
        )}
        {...props}
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          {knowledge.image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.image}`}
              alt={knowledge.knowledge_title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted">
              <Icons.placeholder
                className="size-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-2.5 sm:p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-blue-900 transition-colors group-hover:text-blue-700 sm:text-base">
            {knowledge.knowledge_title}
          </h3>
          <p className="line-clamp-3 flex-1 text-xs text-gray-600 sm:text-sm">
            {knowledge.description}
          </p>
        </div>

        <CardFooter className="border-t p-2.5 sm:p-4">
          <MotionDiv
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={cn(
              buttonVariants({
                size: "sm",
                className:
                  "w-full bg-blue-600 text-xs hover:bg-blue-700 sm:text-sm",
              })
            )}
          >
            Lihat Materi
          </MotionDiv>
        </CardFooter>
      </Card>
    </Link>
  )
}
