"use client"

import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  EmptyKnowledgeContentInitial,
  KnowledgeSectionContent,
} from "@/components/app/knowledge/detail/content/ui"
import { CreateSectionButton } from "@/components/app/knowledge/detail/section/operations"
import {
  EmptyKnowledgeSectionInitial,
  KnowledgeSectionList,
} from "@/components/app/knowledge/detail/section/ui"

interface DetailSidebarKnowledgeProps {
  dataKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
}

export function DetailSidebarKnowledge({
  dataKnowledge,
  contentData,
  activeIndex,
  setActiveIndex,
  setContentData,
}: DetailSidebarKnowledgeProps) {
  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="account" className="w-full font-semibold">
            📑 Pengetahuan
          </TabsTrigger>
        </TabsList>
        {dataKnowledge.data.section ? (
          <CreateSectionButton
            id_knowledge={dataKnowledge.data.id_knowledge}
            name="Section"
          />
        ) : null}
        <TabsContent value="account">
          <ScrollArea className="h-[600px] w-full">
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
                    <KnowledgeSectionList item={section} />
                    {section.content ? (
                      section.content.map((content) => (
                        <KnowledgeSectionContent
                          content={content}
                          activeIndex={activeIndex}
                          setActiveIndex={setActiveIndex}
                          contentData={contentData}
                          setContentData={setContentData}
                          dataKnowledge={dataKnowledge}
                        />
                      ))
                    ) : (
                      <EmptyKnowledgeContentInitial
                        id_section={section.id_section}
                      />
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <EmptyKnowledgeSectionInitial
                id_knowledge={dataKnowledge.data.id_knowledge}
              />
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}