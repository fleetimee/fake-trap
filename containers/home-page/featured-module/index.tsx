import Link from "next/link"
import { Variants } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"

import { CategoryListRes } from "@/types/category/res"
import { CategoryCard } from "@/components/cards/category-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { Button } from "@/components/ui/button"

interface FeaturedModuleProps {
  categoryResponse: CategoryListRes
}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

export function FeaturedModule({ categoryResponse }: FeaturedModuleProps) {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-6 bg-[url(/second_bg.svg)] bg-cover bg-right-bottom bg-no-repeat py-16  lg:min-h-[60svh]"
    >
      <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-16 sm:px-6 md:space-y-16 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1  md:bg-none">
            <h2 className="flex-1 font-heading text-2xl font-medium  sm:text-3xl md:bg-none">
              Modul Populer
            </h2>
            <p className="max-w-[46rem] text-balance leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Modul populer yang tersedia di BPD DIY Elearning, yang sudah di
              akses oleh banyak pengguna
            </p>
          </div>

          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link href={"intro/categories/all"}>
              Lihat Semua
              <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <MotionDiv
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={parentVariant}
          initial="initial"
          animate="animate"
        >
          {categoryResponse.data.map((category) => (
            <MotionDiv
              variants={childVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category.id_category}
              className="group relative overflow-hidden rounded-md border"
            >
              <CategoryCard
                category={category}
                link={`/intro/categories/${category.id_category}`}
              />
            </MotionDiv>
          ))}

          <Button
            variant="ghost"
            className="col-span-2 mx-auto flex w-full sm:col-auto sm:hidden"
            asChild
          >
            <Link href={"intro/knowledge/all"}>
              Lihat Semua
              <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </MotionDiv>
      </div>
    </section>
  )
}
