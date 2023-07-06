"use client"

import { CourseByIdResponse } from "@/types/course-res"
import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import { QuizRes } from "@/types/quiz-res"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseKnowledgeSectionContent } from "@/components/app/course/detail/course-knowledge/course-knowledge-section-content"
import { CourseKnowledgeSectionList } from "@/components/app/course/detail/course-knowledge/course-knowledge-section-list"
import { EmptyKnowledgeCourse } from "@/components/app/course/detail/course-knowledge/empty-course-knowledge-content"

import { EmptyContent } from "../knowledge/detail-sidebar-empty-content"
import { CourseSectionContent } from "./detail/content/course-section-content"
import { CourseSectionQuiz } from "./detail/content/course-section-quiz"
import { EmptyCourseContentInitial } from "./detail/content/empty-course-content-initial"
import { CreateCourseSectionButton } from "./detail/section/course-create-section-button"
import { CourseSectionList } from "./detail/section/course-section-list"

export function DetailSidebarCourse(props: {
  dataKnowledge: KnowledgeByIdResponse
  dataCourse: CourseByIdResponse
  dataQuiz: QuizRes
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
                key={props.dataKnowledge.data.id_knowledge}
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
          <CreateCourseSectionButton
            id_course={props.dataCourse.data.id_course}
          />
          <ScrollArea className="h-[600px] w-full">
            {props.dataCourse.data.section ? (
              <Accordion
                type="single"
                className="px-4"
                collapsible
                key={props.dataCourse.data.id_course}
              >
                {props.dataCourse.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <CourseSectionList item={section} />

                    {section.quiz &&
                      section.quiz?.map((q) => (
                        <CourseSectionQuiz quiz={q} quizData={props.dataQuiz} />
                      ))}

                    {/* 
                      Ini adalah content section yang ada 
                      di dalam course berisikan context menu untuk menambahkan
                      content baru, mengedit, dan menghapus content serta juga bisa menambahkan quiz
                    */}
                    {section.content &&
                      section.content.map((content) => (
                        <CourseSectionContent
                          content={content}
                          quizData={props.dataQuiz}
                        />
                      ))}

                    {/* 
                      Ini merupakan placeholder jika section tidak memiliki content
                      dan quiz
                    */}
                    {(!section.content || section.content?.length === 0) &&
                      (!section.quiz || section.quiz?.length === 0) && (
                        <EmptyCourseContentInitial
                          id_section={section.id_section}
                          quizData={props.dataQuiz}
                        />
                      )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p>Tidak Tersedia</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
