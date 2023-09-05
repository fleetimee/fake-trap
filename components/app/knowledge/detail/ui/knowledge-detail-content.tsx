"use client"

import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import {
  BookmarkButton,
  GenericRender,
  LinkButton,
  PdfDownloadButton,
  VideoDownloadButton,
} from "@/components/buttons-header"
import {
  DefaultRender,
  LinkRender,
  PdfRender,
  YoutubeRender,
} from "@/components/content-renderer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RenderContentProps {
  detailKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  contentType: string
}

export function renderContent({
  detailKnowledge,
  contentData,
  contentType,
}: RenderContentProps) {
  switch (contentType) {
    case "":
      return (
        <DefaultRender
          image={detailKnowledge.data.image}
          alt={detailKnowledge.data.knowledge_title}
        />
      )

    case "0012":
      return <YoutubeRender link={contentData.link} />

    case "0013":
      return <PdfRender link={contentData.link} />

    case "0014":
      return (
        <LinkRender
          link={contentData.link}
          image={detailKnowledge.data.image}
          alt={detailKnowledge.data.knowledge_title}
        />
      )

    case "0016":
      return <GenericRender link={contentData.link} />

    case "0017":
      return <GenericRender link={contentData.link} />

    case "0018":
      return <GenericRender link={contentData.link} />

    default:
      return null
  }
}

interface RenderContentButtonProps {
  link: string
  contentType: string
}

export function renderContentButton({
  contentType,
  link,
}: RenderContentButtonProps) {
  switch (contentType) {
    case "0012":
      return <VideoDownloadButton link={link} />

    case "0013":
      return <PdfDownloadButton link={link} />

    case "0014":
      return <LinkButton link={link} />

    case "0017":
      return <BookmarkButton />

    default:
      return null
  }
}

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
