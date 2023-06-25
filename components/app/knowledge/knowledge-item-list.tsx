import Image from "next/image"
import Link from "next/link"

import { CategoryResponse } from "@/types/category-res"
import { KnowledgeData } from "@/types/knowledge-res"
import { Skeleton } from "@/components/ui/skeleton"
import { DeleteKnowledgeButton } from "@/components/app/knowledge/delete-knowledge-button"
import { EditKnowledgeButton } from "@/components/app/knowledge/edit-knowledge-button"

export function KnowledgeItemList(props: {
  item: KnowledgeData
  category: CategoryResponse
}) {
  const knowledgeItem = props.item

  return (
    <div className="flex items-center justify-between p-4 hover:bg-accent hover:text-accent-foreground">
      <div className="flex">
        <div className="flex-none">
          <Image
            src={knowledgeItem.image}
            sizes="100px"
            width={120}
            height={120}
            alt="Picture of the author"
            className="aspect-video resize-none rounded-md object-cover grayscale hover:animate-pulse hover:filter-none"
          />
        </div>
        <div className="px-4">
          <Link
            href={`/dashboard/knowledge/${knowledgeItem.id_knowledge}`}
            className="font-semibold hover:underline"
          >
            {knowledgeItem.knowledge_title}
          </Link>
          <div>
            <p className=" text-sm text-muted-foreground">
              {knowledgeItem.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse px-2">
        <DeleteKnowledgeButton item={knowledgeItem} />
        <EditKnowledgeButton item={knowledgeItem} category={props.category} />
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
