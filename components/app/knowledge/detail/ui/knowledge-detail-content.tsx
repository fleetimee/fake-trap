"use client"

import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import { MotionDiv } from "@/components/framer-wrapper"
import { renderContent, renderContentButton } from "@/components/render-content"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface KnowledgeDetailContentProps {
  detailKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  contentTypeData: ReferenceListResData[]
}

export function KnowledgeDetailContent({
  detailKnowledge,
  contentData,
}: KnowledgeDetailContentProps) {
  return (
    <Card className="flex w-full basis-3/4 items-start justify-normal">
      <div className="flex w-full flex-col gap-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">
            {detailKnowledge.data.knowledge_title}
          </p>
          <div className="flex">
            {renderContentButton({
              contentType: contentData.content_type,
              link: contentData.link,
            })}
          </div>
        </div>
        {renderContent({
          detailKnowledge,
          contentData,
          contentType: contentData.content_type,
        })}
        <Tabs defaultValue="description" className="relative mr-auto w-full">
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Deskripsi
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle>Deskripsi</CardTitle>
                <CardDescription>Lorem ipsum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-[300px] w-full">
                  <p>{detailKnowledge.data.description}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
