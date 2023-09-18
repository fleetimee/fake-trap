"use client"

import React from "react"
import { Variants } from "framer-motion"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import {
  EmptyKnowledgeContentInitial,
  KnowledgeSectionContent,
} from "@/components/app/knowledge/detail/content/ui"
import { CreateSectionButton } from "@/components/app/knowledge/detail/section/operations"
import {
  EmptyKnowledgeSectionInitial,
  KnowledgeSectionList,
} from "@/components/app/knowledge/detail/section/ui"
import { MotionDiv } from "@/components/framer-wrapper"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DetailSidebarKnowledgeProps {
  dataKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  contentTypeData: ReferenceListResData[]
}

const parentVariant: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.5 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 0.2,
    },
  },
}

const parentVariant2: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.3 } },
}

const childrenVariant2: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 0.2,
    },
  },
}

export function DetailSidebarKnowledge({
  dataKnowledge,
  contentData,
  activeIndex,
  setActiveIndex,
  setContentData,
  contentTypeData,
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
          <div className="ml-auto flex w-full justify-end py-4 pr-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CreateSectionButton
                    id_knowledge={dataKnowledge.data.id_knowledge}
                    name="Section"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tambahkan Bagian Pengetahuan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : null}
        <MotionDiv variants={parentVariant} initial="initial" animate="animate">
          <TabsContent value="account">
            <ScrollArea className="h-[600px] w-full">
              {dataKnowledge.data.section ? (
                <MotionDiv variants={childrenVariant} className="child">
                  <Accordion
                    type="single"
                    collapsible
                    className="px-4"
                    key={dataKnowledge.data.knowledge_title}
                    defaultValue={dataKnowledge.data.section[0].id_section.toString()}
                  >
                    {dataKnowledge.data.section.map((section) => (
                      <MotionDiv
                        variants={parentVariant2}
                        initial="initial"
                        animate="animate"
                      >
                        <AccordionItem
                          key={section.id_section}
                          value={section.id_section.toString()}
                          className="text-sm"
                        >
                          <KnowledgeSectionList item={section} />
                          {section.content ? (
                            section.content.map((content) => (
                              <MotionDiv
                                variants={childrenVariant2}
                                className="child"
                                key={content.id_content}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <KnowledgeSectionContent
                                  content={content}
                                  activeIndex={activeIndex}
                                  setActiveIndex={setActiveIndex}
                                  contentData={contentData}
                                  setContentData={setContentData}
                                  dataKnowledge={dataKnowledge}
                                  contentTypeData={contentTypeData}
                                />
                              </MotionDiv>
                            ))
                          ) : (
                            <EmptyKnowledgeContentInitial
                              contentTypeData={contentTypeData}
                              id_section={section.id_section}
                            />
                          )}
                        </AccordionItem>
                      </MotionDiv>
                    ))}
                  </Accordion>
                </MotionDiv>
              ) : (
                <EmptyKnowledgeSectionInitial
                  id_knowledge={dataKnowledge.data.id_knowledge}
                />
              )}
            </ScrollArea>
          </TabsContent>
        </MotionDiv>
      </Tabs>
    </Card>
  )
}
