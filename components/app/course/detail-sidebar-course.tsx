"use client"

import { CourseByIdResponse } from "@/types/course-res"
import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseKnowledgeSectionContent } from "@/components/app/course/detail/course-knowledge/course-knowledge-section-content"
import { CourseKnowledgeSectionList } from "@/components/app/course/detail/course-knowledge/course-knowledge-section-list"
import { EmptyKnowledgeCourse } from "@/components/app/course/detail/course-knowledge/empty-course-knowledge-content"

import { EmptyContent } from "../knowledge/detail-sidebar-empty-content"

export function DetailSidebarCourse(props: {
  dataKnowledge: KnowledgeByIdResponse
  dataCourse: CourseByIdResponse
}) {
  return (
    <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="knowledge" className="w-full font-semibold">
            Pengetahuan
          </TabsTrigger>
          <TabsTrigger value="course" className="w-full font-semibold">
            Kursus
          </TabsTrigger>
        </TabsList>
        <TabsContent value="knowledge">
          <ScrollArea className="h-[660px] w-full">
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
                    <CourseKnowledgeSectionList section={section} />
                    {section.content ? (
                      section.content?.map((content) => (
                        <CourseKnowledgeSectionContent content={content} />
                      ))
                    ) : (
                      <EmptyKnowledgeCourse />
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
                {/* <CreateButton variant="outline" name="Tambah" /> */}
              </EmptyContent>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="course">
          <ScrollArea className="h-[660px] w-full">
            {props.dataCourse.data.section ? (
              <Accordion type="single"></Accordion>
            ) : (
              <p>Tidak Tersedia</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
