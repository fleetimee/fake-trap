"use client"

import Image from "next/image"
import Link from "next/link"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { Skeleton } from "@/components/ui/skeleton"
import { DeleteKnowledgeButton } from "@/components/app/knowledge/delete-knowledge-button"
import { EditKnowledgeButton } from "@/components/app/knowledge/edit-knowledge-button"

interface KnowledgeItemListProps {
  knowledgeData: KnowledgeListResData
  categoryResponse: CategoryListRes
  token: string | undefined
}

export function KnowledgeItemList({
  knowledgeData,
  categoryResponse,
  token,
}: KnowledgeItemListProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-accent hover:text-accent-foreground">
      <div className="flex">
        <div className="flex-none">
          <Image
            src={knowledgeData.image}
            sizes="100px"
            width={120}
            height={120}
            alt="Picture of the author"
            className="aspect-video resize-none rounded-md object-cover grayscale hover:animate-pulse hover:filter-none"
          />
        </div>
        <div className="px-4">
          <Link
            href={`/dashboard/knowledge/${knowledgeData.id_knowledge}`}
            className="font-semibold hover:underline"
          >
            {knowledgeData.knowledge_title}
          </Link>
          <div>
            <p className=" line-clamp-2 text-sm text-muted-foreground">
              {knowledgeData.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse px-2">
        <DeleteKnowledgeButton knowledgeData={knowledgeData} token={token} />
        <EditKnowledgeButton
          categoryResponse={categoryResponse}
          knowledgeData={knowledgeData}
          token={token}
        />
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
