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
        <TabsContent value="account">
          <ScrollArea className="h-[650px]  w-full">
            {dataKnowledge.data.section ? (
              <Accordion type="single" collapsible className="px-4">
                {dataKnowledge.data.section.map((section, index) => (
                  <AccordionItem
                    key={section.id_section}
                    value={`item-`}
                    className="text-sm"
                  >
                    <AccordionTrigger className="font-heading text-base font-bold">
                      {section.section_title}
                    </AccordionTrigger>
                    <AccordionContent className="py-4">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-sm">Tidak ada pengetahuan</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
