"use client"

import React from "react"

import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateSectionButton } from "@/components/create-section-button"
import { EmptyContentInitial } from "@/components/empty-knowledge-content-initial"
import { EmptyKnowledgeSectionInitial } from "@/components/empty-knowledge-section-initial"
import { SectionKnowledgeContent } from "@/components/section-knowledge"

/**
 * Renders the sidebar for the knowledge detail page.
 * @param dataKnowledge The knowledge data to display.
 * @returns A React component representing the sidebar for the knowledge detail page.
 */
export default function DetailSidebarKnowledge(
  dataKnowledge: KnowledgeByIdResponse
) {
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
                        <SectionKnowledgeContent content={content} />
                      ))
                    ) : (
                      <EmptyContentInitial id_section={section.id_section} />
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
