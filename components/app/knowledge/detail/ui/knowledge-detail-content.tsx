"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import { getYoutubeLastId } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { PdfViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubePlayer } from "@/components/youtube-player"

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
        <Image
          src={detailKnowledge.data.image}
          alt={detailKnowledge.data.knowledge_title}
          className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
          width={1280}
          height={720}
        />
      )

    case "0012":
      return <YoutubePlayer videoId={getYoutubeLastId(contentData.link)} />

    case "0013":
      return <PdfViewer />

    case "0014":
      return (
        <Link
          href={contentData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-4"
        >
          <Image
            src={detailKnowledge.data.image}
            alt={detailKnowledge.data.knowledge_title}
            className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
            width={1280}
            height={720}
          />
          <Button className="w-full text-left">
            <Icons.link className="h-4 w-4" />
            <span className="ml-2">Buka Link</span>
          </Button>
        </Link>
      )

    default:
      return null
  }
}

interface RenderContentButtonProps {
  contentType: string
}

export function renderContentButton({ contentType }: RenderContentButtonProps) {
  switch (contentType) {
    case "0012":
      return null

    case "0013":
      return (
        <>
          <HoverCard>
            <HoverCardTrigger>
              <Link
                href={"/sample.pdf"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.save className="h-14 w-14 flex-none  pl-5" />
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-full">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Unduh / Simpan PDF</h4>
                  <p className="text-sm">
                    Unduh atau simpan PDF untuk dibaca nanti.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <Icons.bookmark className="h-14 w-14 flex-none pl-5" />
        </>
      )

    case "0014":
      return <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />

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
  contentTypeData,
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
