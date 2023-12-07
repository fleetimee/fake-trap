import Image from "next/image"
import Link from "next/link"

import { CategoryListResData } from "@/types/category/res"
import { cn, convertDatetoString } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"

import { Icons } from "./icons"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface CategoryCardProps {
  category: CategoryListResData
  link: string
}

export async function CategoryCard({ category, link }: CategoryCardProps) {
  return (
    <Link href={link} className="cursor-pointer">
      <span className="sr-only">{category.category_name}</span>
      <Card className="h-full cursor-pointer overflow-hidden transition-colors  hover:border-primary hover:bg-muted/50">
        <AspectRatio ratio={21 / 9}>
          <div className="h-full rounded-t-md border-b">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />

            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.image}`}
              alt={category.category_name}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">
            {category.category_name}
          </CardTitle>

          <CardDescription className="line-clamp-1">
            {convertDatetoString(category.updated_at.toString())}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
