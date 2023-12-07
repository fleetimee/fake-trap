// TODO: Remove use client if building
"use client"

import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { CategoryCard } from "@/components/category-card"
import { MotionDiv } from "@/components/framer-wrapper"

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

interface UserCategoryWrapperProps {
  categoryResp: CategoryListRes
}

export function UserCategoryWrapper({
  categoryResp,
}: UserCategoryWrapperProps) {
  return (
    <MotionDiv
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={parentVariant}
      initial="initial"
      animate="animate"
    >
      {!categoryResp.data
        ? null
        : categoryResp.data.map((category) => (
            <MotionDiv
              variants={childrenVariant}
              className="child group relative overflow-hidden rounded-md border"
            >
              <CategoryCard
                category={category}
                key={category.id_category}
                link={`/member-area/category/${category.id_category}`}
              />
            </MotionDiv>
          ))}
    </MotionDiv>
  )
}
