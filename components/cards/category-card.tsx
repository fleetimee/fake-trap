import Image from "next/image"
import Link from "next/link"

import { CategoryListResData } from "@/types/category/res"
import { convertDatetoString } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface CategoryCardProps {
  category: CategoryListResData
  link: string
}

export async function CategoryCard({ category, link }: CategoryCardProps) {
  return (
    <Link href={link} className="cursor-pointer">
      <span className="sr-only">{category.category_name}</span>
      <Tooltip>
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
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="line-clamp-1 text-left text-sm hover:text-blue-600 hover:underline">
                  {category.category_name}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>{category.category_name}</TooltipContent>
            </Tooltip>
            <CardDescription className="line-clamp-1">
              {convertDatetoString(category.updated_at.toString())}
            </CardDescription>
          </CardHeader>
        </Card>
      </Tooltip>
    </Link>
  )
}
