"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { CategoryOneResKnowledge } from "@/types/category/res"
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

interface PublicKnowledgeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  knowledge: CategoryOneResKnowledge
  link: string
}

export function KnowledgeCard({
  knowledge,
  className,
  link,
  ...props
}: PublicKnowledgeCardProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={link}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {knowledge.image ? (
              <Image
                src={knowledge.image}
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
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
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
            Lihat Pengetahuan
          </MotionDiv>{" "}
        </Link>
      </CardFooter>
    </Card>
  )
}
