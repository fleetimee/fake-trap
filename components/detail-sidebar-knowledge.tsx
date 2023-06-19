import React from "react"
import * as z from "zod"

import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateButton } from "@/components/create-button"
import { EmptyContent } from "@/components/detail-sidebar-empty-content"

import { CreateSectionButton } from "./create-section-button"

/**
 * Defines a schema for the form data used to create a new section in the knowledge sidebar.
 */
const formSchema = z.object({
  section_title: z.string().min(2).max(18),
})

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
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <AccordionContent
                              key={content.id_content}
                              className="py-1"
                            >
                              {content.content_title ? (
                                <Button className="flex h-[65px] w-full justify-start rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
                                  {content.content_title}
                                </Button>
                              ) : null}
                            </AccordionContent>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem>Profile</ContextMenuItem>
                            <ContextMenuItem>Billing</ContextMenuItem>
                            <ContextMenuItem>Team</ContextMenuItem>
                            <ContextMenuItem>Subscription</ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      ))
                    ) : (
                      <ContextMenu>
                        <ContextMenuTrigger>
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
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem>Profile</ContextMenuItem>
                          <ContextMenuItem>Billing</ContextMenuItem>
                          <ContextMenuItem>Team</ContextMenuItem>
                          <ContextMenuItem>Subscription</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
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
