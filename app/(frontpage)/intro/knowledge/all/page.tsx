import { Variants } from "framer-motion"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

import { KnowledgeWrapper } from "./_components/knowledge-wrapper"

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

      <KnowledgeWrapper publicKnowledgeResp={publicKnowledgeResp} />
    </Shell>
  )
}
