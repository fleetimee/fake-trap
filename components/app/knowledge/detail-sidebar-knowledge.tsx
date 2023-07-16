"use client"

import React from "react"

import {
  KnowledgeByIdResponse,
  KnowledgeByIdSectionContentData,
} from "@/types/knowledge-res"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyKnowledgeContentInitial } from "@/components/app/knowledge/detail/content/empty-knowledge-content-initial"
import { KnowledgeSectionContent } from "@/components/app/knowledge/detail/content/knowledge-section-content"
import { CreateSectionButton } from "@/components/app/knowledge/detail/section/create-section-button"
import { EmptyKnowledgeSectionInitial } from "@/components/app/knowledge/detail/section/empty-knowledge-section-initial"
import { KnowledgeSectionList } from "@/components/app/knowledge/detail/section/knowledge-section-list"

export default function DetailSidebarKnowledge(props: {
  dataKnowledge: KnowledgeByIdResponse
  contentData: KnowledgeByIdSectionContentData
  setContentData: React.Dispatch<
    React.SetStateAction<KnowledgeByIdSectionContentData>
  >
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="account" className="w-full font-semibold">
            📑 Pengetahuan
          </TabsTrigger>
        </TabsList>
        {props.dataKnowledge.data.section ? (
          <CreateSectionButton
            id_knowledge={props.dataKnowledge.data.id_knowledge}
            name="Section"
          />
        ) : null}
        <TabsContent value="account">
          <ScrollArea className="h-[600px] w-full">
            {props.dataKnowledge.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={props.dataKnowledge.data.knowledge_title}
              >
                {props.dataKnowledge.data.section.map((section) => (
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
                          activeIndex={props.activeIndex}
                          setActiveIndex={props.setActiveIndex}
                          contentData={props.contentData}
                          setContentData={props.setContentData}
                          dataKnowledge={props.dataKnowledge}
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
                id_knowledge={props.dataKnowledge.data.id_knowledge}
              />
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
