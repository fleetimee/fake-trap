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

import { Button } from "./ui/button"

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
                        <AccordionContent
                          key={content.id_content}
                          className="py-4"
                        >
                          {content.content_title ? (
                            <Button className="flex h-auto items-center justify-center rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
                              {content.content_title}
                            </Button>
                          ) : null}
                        </AccordionContent>
                      ))
                    ) : (
                      <AccordionContent className="py-4">
                        Tidak ada konten
                      </AccordionContent>
                    )}
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
