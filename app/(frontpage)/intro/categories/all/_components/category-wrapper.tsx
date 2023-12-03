"use client"

import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { CategoryCard } from "@/components/category-card"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"





interface GetPublicCategoriesProps {
  publicCategoryResp: CategoryListRes
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

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export function CategoryWrapper({
  publicCategoryResp,
}: GetPublicCategoriesProps) {
  return (
    <>
      <MotionDiv
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <HeaderIntro
          title="Semua Pengetahuan"
          description="Temukan pengetahuan yang kamu butuhkan"
          size="sm"
        />
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        {publicCategoryResp.data.map((category) => (
          <MotionDiv
            variants={childrenVariant}
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
      </MotionDiv>
    </>
  )
}
