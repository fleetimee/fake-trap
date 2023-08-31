import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
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

interface PublicKnowledgeDetailContentProps {
  dataKnowledge: KnowledgeOneRes
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

export function PublicDetailSidebarKnowledge({
  dataKnowledge,
  setContentData,
  activeIndex,
  setActiveIndex,
}: PublicKnowledgeDetailContentProps) {
  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="account" className="w-full font-semibold">
            📑 Pengetahuan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <ScrollArea className="h-[680px] w-full">
            {dataKnowledge.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={dataKnowledge.data.knowledge_title}
                defaultValue={dataKnowledge.data.section[0].id_section.toString()}
              >
                {dataKnowledge.data.section.map((section) => (
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
                          <Button
                            className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading "
                            onClick={() => {
                              setActiveIndex(content.id_content)
                              setContentData(content)
                            }}
                            disabled={activeIndex == content.id_content}
                          >
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
  )
}
