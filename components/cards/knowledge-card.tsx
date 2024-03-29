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
    <HoverCard>
      <HoverCardTrigger>
        <Card
          className={cn(
            "h-full overflow-hidden rounded-sm hover:border-primary ",
            className
          )}
          {...props}
        >
          <Link href={link}>
            <CardHeader className="border-b p-0">
              <AspectRatio ratio={4 / 3}>
                {knowledge.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.image}`}
                    alt={knowledge.id_knowledge.toString()}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex size-full items-center justify-center bg-secondary"
                  >
                    <Icons.placeholder
                      className="size-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </AspectRatio>
            </CardHeader>
          </Link>
          <Link href={link}>
            <CardContent className="grid gap-2.5 p-4">
              <CardTitle className="line-clamp-1">
                {knowledge.knowledge_title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {knowledge.description}
              </CardDescription>
            </CardContent>
          </Link>
          <CardFooter className="p-4">
            <Link href={link}>
              <MotionDiv
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    className: "h-8 w-full",
                  })
                )}
              >
                Lihat Materi
              </MotionDiv>{" "}
            </Link>
          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent side="top" avoidCollisions={false}>
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              {knowledge.knowledge_title}
            </h4>
            <p className="text-sm">{knowledge.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
