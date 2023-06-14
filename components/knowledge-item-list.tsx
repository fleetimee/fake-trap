import Image from "next/image"
import Link from "next/link"

import { KnowledgeData } from "@/types/knowledge"

export function KnowledgeItemList(props: { item: KnowledgeData }) {
  const knowledgeItem = props.item

  return (
    <div className="flex items-center p-4">
      <div className="flex  justify-center">
        <Image
          src={knowledgeItem.image}
          sizes="100px"
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="grid gap-2 px-8">
        <Link
          href={`/editor/${knowledgeItem.id_knowledge}`}
          className="font-semibold hover:underline"
        >
          {knowledgeItem.knowledge_title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {knowledgeItem.description}
          </p>
        </div>
      </div>
    </div>
  )
}
