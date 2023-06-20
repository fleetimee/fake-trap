import React from "react"

import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateButton } from "@/components/create-button"
import { CreateSectionButton } from "@/components/create-section-button"
import { EmptyContent } from "@/components/detail-sidebar-empty-content"
import { SectionKnowledge } from "@/components/section-knowledge"

/**
 * Renders a card with a tabbed interface containing knowledge-related content.
 * @returns JSX.Element
 */
export function DetailSidebarKnowledge(dataKnowledge: KnowledgeByIdResponse) {
  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger value="account" className="w-full font-semibold">
            📑 Pengetahuan
          </TabsTrigger>
        </TabsList>
        {dataKnowledge.data.section ? (
          <CreateSectionButton id_knowledge={dataKnowledge.data.id_knowledge} />
        ) : null}
        <TabsContent value="account">
          <ScrollArea className="h-[600px] w-full">
            {dataKnowledge?.data?.section ? (
              <Accordion type="single" collapsible className="px-4">
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
                        <SectionKnowledge content={content} />
                      ))
                    ) : (
                      <AccordionContent className="py-4">
                        <EmptyContent className="h-[50px]">
                          <EmptyContent.Icon name="empty" />
                          <EmptyContent.Title>
                            Tidak ada konten
                          </EmptyContent.Title>
                          <EmptyContent.Description>
                            Konten tidak tersedia
                          </EmptyContent.Description>
                          <CreateButton variant="outline" name="Tambah" />
                        </EmptyContent>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <EmptyContent className="h-[625px] items-center justify-center">
                <EmptyContent.Icon name="empty" />
                <EmptyContent.Title>Tidak ada section</EmptyContent.Title>
                <EmptyContent.Description>
                  Section tidak tersedia
                </EmptyContent.Description>
                <CreateButton variant="outline" name="Tambah" />
              </EmptyContent>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
