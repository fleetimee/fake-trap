// TODO: Remove use client if building
"use client"

import { Variants } from "framer-motion"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
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

interface UserKnowledgeWrapperProps {
  knowledgeResp: KnowledgeListRes
}

export function UserKnowledgeWrapper({
  knowledgeResp,
}: UserKnowledgeWrapperProps) {
  return (
    <MotionDiv
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={parentVariant}
      initial="initial"
      animate="animate"
    >
      {!knowledgeResp.data
        ? null
        : knowledgeResp.data.map((knowledge) => (
            <MotionDiv
              key={knowledge.id_knowledge}
              variants={childrenVariant}
              className="child"
              whileHover={{
                scale: 1.05,
              }}
            >
              <KnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
                link={`/member-area/knowledge/${knowledge.id_knowledge}`}
              />
            </MotionDiv>
          ))}
    </MotionDiv>
  )
}
