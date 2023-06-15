import Image from "next/image"
import Link from "next/link"

import { KnowledgeData } from "@/types/knowledge"

import { Skeleton } from "./ui/skeleton"

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
          className="rounded-md grayscale  hover:animate-pulse hover:filter-none"
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

KnowledgeItemList.Skeleton = function KnowledgeItemListSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
