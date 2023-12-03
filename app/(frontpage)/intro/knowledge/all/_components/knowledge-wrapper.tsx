"use client"

import { Variants } from "framer-motion"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
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

interface GetPublicKnowledgeProps {
  publicKnowledgeResp: KnowledgeListRes
}

export function KnowledgeWrapper({
  publicKnowledgeResp,
}: GetPublicKnowledgeProps) {
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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        {!publicKnowledgeResp.data
          ? null
          : publicKnowledgeResp.data.map((knowledge) => (
              <MotionDiv
                variants={childrenVariant}
                className="child"
                whileHover={{
                  scale: 1.05,
                }}
              >
                <KnowledgeCard
                  key={knowledge.id_knowledge}
                  knowledge={knowledge}
                  link={`/intro/knowledge/${knowledge.id_knowledge}`}
                />
              </MotionDiv>
            ))}
      </MotionDiv>
    </>
  )
}
