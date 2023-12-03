"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { cn } from "@/lib/utils"
import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"





interface PreviewKnowledgeDetailSidebarProps {
  knowledgePreview: KnowledgeOneRes
}

export function PreviewKnowledgeDetailSidebar({
  knowledgePreview,
}: PreviewKnowledgeDetailSidebarProps) {
  const pathname = usePathname()

  const isContent = pathname.includes("/content")

  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="knowledge" className="w-full font-semibold">
            📑 Pengetahuan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge">
          <ScrollArea className="h-[700px] w-full">
            {knowledgePreview.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={knowledgePreview.data.section[0].id_section.toString()}
                defaultValue={knowledgePreview.data.section[0].id_section.toString()}
              >
                {knowledgePreview.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <AccordionTrigger className="font-heading text-base font-bold">
                      {section.section_title}
                    </AccordionTrigger>
                    {section.content ? (
                      section.content.map((content) => (
                        <AccordionContent className="py-1">
                          {content.content_title ? (
                            <Link
                              href={
                                isContent
                                  ? `/supervisor-area/approval/approve-knowledge/preview-knowledge/${knowledgePreview.data.id_knowledge}/content/${content.id_content}`
                                  : `${pathname}/content/${content.id_content}`
                              }
                            >
                              <Button
                                className={cn(
                                  "flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background",
                                  {
                                    "bg-secondary-foreground":
                                      isContent &&
                                      pathname.includes(
                                        `/content/${content.id_content}`
                                      ),
                                  }
                                )}
                              >
                                {content.content_title}
                              </Button>
                            </Link>
                          ) : null}
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
            ) : null}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
