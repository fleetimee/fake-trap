"use client"

import { Metadata } from "next"
import Link from "next/link"
import { RocketIcon } from "@radix-ui/react-icons"

import {
  getPublicCategoriesDataById,
  getPublicKnowledgeDataById,
} from "@/lib/datasource"
import { cn, toSentenceCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyContent } from "@/components/app/knowledge/detail-sidebar-empty-content"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell/lobby-shell"
import { YoutubePlayer } from "@/components/youtube-player"

type DetailContentProps = {
  params: {
    knowledge: string
  }
}

export async function generateMetadata({
  params,
}: DetailContentProps): Promise<Metadata> {
  const detailKnowledgeData = await getPublicKnowledgeDataById({
    id: parseInt(params.knowledge),
  })

  return {
    title: detailKnowledgeData.data.knowledge_title,
  }
}

export default async function IntroDetailKnowledge({
  params,
}: DetailContentProps) {
  const detailKnowledgeData = getPublicKnowledgeDataById({
    id: parseInt(params.knowledge),
  })

  const [detailKnowledgeDataResp] = await Promise.all([detailKnowledgeData])

  const detailCategoryResp = await getPublicCategoriesDataById({
    id: detailKnowledgeDataResp.data.id_category,
  })

  return (
    <Shell>
      <div className="flex flex-row gap-4 px-2">
        <Alert className="basis-full">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Kursus ini berdasarkan pada pengetahuan{" "}
            {/* <span className="font-bold">
              {courseKnowledgeResp.data.knowledge_title}
            </span> */}
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex items-center space-x-1 px-2 text-sm capitalize text-muted-foreground">
        <div className="truncate">Pengetahuan</div>
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
        <Link href={`/intro/categories/${detailCategoryResp.data.id_category}`}>
          <div className={cn("text-foreground")}>
            {detailCategoryResp.data.category_name}
          </div>
        </Link>
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
        <div className="text-foreground">
          {toSentenceCase(detailKnowledgeDataResp.data.knowledge_title)}
        </div>
      </div>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {detailKnowledgeDataResp.data.knowledge_title}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>
            {/* <Image
              src={dataContentKnowledge.data.image}
              alt={dataContentKnowledge.data.knowledge_title}
              className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
              width={1280}
              height={720}
            /> */}
            <YoutubePlayer videoId="fqQ1Xum8uNI" />
            <Tabs
              defaultValue="description"
              className="relative mr-auto w-full"
            >
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
                    <CardDescription>
                      {detailKnowledgeDataResp.data.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{"asd"}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
        <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex w-full">
              <TabsTrigger value="account" className="w-full font-semibold">
                📑 Pengetahuan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <ScrollArea className="h-[680px] w-full">
                {detailKnowledgeDataResp.data.section ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="px-4"
                    key={detailKnowledgeDataResp.data.knowledge_title}
                  >
                    {detailKnowledgeDataResp.data.section.map((section) => (
                      <AccordionItem
                        key={section.id_section}
                        value={section.id_section.toString()}
                        className="text-sm"
                      >
                        <AccordionTrigger className="font-heading text-base font-bold">
                          {section.section_title}
                        </AccordionTrigger>
                        {section.content ? (
                          section.content.map((content) => (
                            <AccordionContent
                              key={content.id_content}
                              className="py-1"
                            >
                              <Button className="flex h-[65px] w-full justify-start rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
                                {content.content_title}
                              </Button>
                            </AccordionContent>
                          ))
                        ) : (
                          <AccordionContent className="py-4">
                            <EmptyContent className="h-[50px]">
                              <EmptyContent.Icon name="empty" />
                              <EmptyContent.Title>
                                Tidak ada konten
                              </EmptyContent.Title>
                              <EmptyContent.Description>
                                Belum ada konten untuk bagian ini
                              </EmptyContent.Description>
                            </EmptyContent>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>Empty</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Shell>
  )
}
