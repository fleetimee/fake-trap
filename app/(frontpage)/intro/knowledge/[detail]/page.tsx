import Image from "next/image"

import { getOnePublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"

type Props = {
  params: {
    detail: string
  }
}

export default async function IntroDetailKnowledge({ params }: Props) {
  const knowledge = await getOnePublicKnowledge({
    idKnowledge: parseInt(params.detail),
  })

  // const isPublic = await lookupKnowledgePublic({
  //   idKnowledge: parseInt(params.detail),
  // })

  // console.log(isPublic)

  // if (!isPublic.data) {
  //   return notFound()
  // }

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
      alt={knowledge.data.knowledge_title}
      className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
      width={1280}
      height={720}
    />
  )
}
