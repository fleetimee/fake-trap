import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

import { CategoryListResData } from "@/types/category/res"
import { cn, convertDatetoString } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CategoryCardProps {
  category: CategoryListResData
  link: string
}

export function CategoryCard({ category, link }: CategoryCardProps) {
  return (
    <Link href={link} className="group flex h-full">
      <Card
        className={cn(
          "flex w-full flex-col overflow-hidden transition-all duration-200 hover:shadow-md",
          "border-transparent hover:border-primary/50"
        )}
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5 transition-opacity group-hover:opacity-70" />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.image}`}
              alt={category.category_name}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="line-clamp-1 text-sm font-semibold text-white drop-shadow-sm sm:text-base">
                {category.category_name}
              </h3>
            </div>
          </div>
        </div>

        <CardFooter className="border-t p-2.5 sm:p-4">
          <div
            className={cn(
              "w-full rounded-md bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white",
              "transition-colors duration-200 hover:bg-blue-700 sm:text-sm"
            )}
          >
            Lihat Modul
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
