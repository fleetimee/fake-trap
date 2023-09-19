import { Variants } from "framer-motion"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { PublicKnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

export const metadata = {
  title: "Semua Pengetahuan",
  description: "fleetime",
}

interface GetPublicKnowledgeProps {
  limit: number
  page: number
}

async function getPublicKnowledge({
  limit,
  page,
}: GetPublicKnowledgeProps): Promise<KnowledgeListRes> {
  const publicKnowledge = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge?limit=1000&page=1&orderBy=desc&sortBy=created_at`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await publicKnowledge.json()
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

export default async function AllPublicKnowledge() {
  const publicKnowledgeResp = await getPublicKnowledge({
    page: 1,
    limit: 1000,
  })

  return (
    <Shell>
      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Explore",
          },
          {
            title: "Semua Pengetahuan",
            href: `/intro/knowledge/all`,
          },
        ]}
      />

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
                <PublicKnowledgeCard
                  key={knowledge.id_knowledge}
                  knowledge={knowledge}
                />
              </MotionDiv>
            ))}
      </MotionDiv>
    </Shell>
  )
}
