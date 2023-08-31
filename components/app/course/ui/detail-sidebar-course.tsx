"use client"

import React from "react"

import { CourseOneRes, CourseOneResQuiz } from "@/types/course/res"
import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { QuizListRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import {
  CourseSectionContent,
  CourseSectionQuiz,
  EmptyCourseContentInitial,
} from "@/components/app/course/detail/content/ui"
import {
  CourseKnowledgeSectionContent,
  CourseKnowledgeSectionList,
  EmptyKnowledgeCourse,
} from "@/components/app/course/detail/course-knowledge/ui"
import { CreateCourseSectionButton } from "@/components/app/course/detail/section/operations"
import { CourseSectionList } from "@/components/app/course/detail/section/ui"
import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseDetailShellProps {
  courseKnowledgeResp: KnowledgeOneRes
  courseDataResp: CourseOneRes
  quizResp: QuizListRes
  contentData: KnowledgeOneResContent
  contentQuiz: CourseOneResQuiz
  setContentQuiz: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  contentTypeResp: ReferenceListRes
}

export function DetailSidebarCourse({ ...props }: CourseDetailShellProps) {
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
            {props.courseKnowledgeResp.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={props.courseKnowledgeResp.data.id_knowledge}
                defaultValue={props.courseKnowledgeResp.data.section[0].id_section.toString()}
              >
                {props.courseKnowledgeResp.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <CourseKnowledgeSectionList section={section} />
                    {section.content ? (
                      section.content?.map((content) => (
                        <CourseKnowledgeSectionContent
                          contentQuiz={props.contentQuiz}
                          setContentQuiz={props.setContentQuiz}
                          content={content}
                          activeIndex={props.activeIndex}
                          setActiveIndex={props.setActiveIndex}
                          contentData={props.contentData}
                          setContentData={props.setContentData}
                        />
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
              </EmptyContent>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="course">
          <CreateCourseSectionButton
            id_course={props.courseDataResp.data.id_course}
          />
          <ScrollArea className="h-[600px] w-full">
            {props.courseDataResp.data.section ? (
              <Accordion
                type="single"
                className="px-4"
                collapsible
                key={props.courseDataResp.data.id_course}
                defaultValue={props.courseDataResp.data.section[0].id_section.toString()}
              >
                {props.courseDataResp.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <CourseSectionList item={section} />

                    {section.quiz &&
                      section.quiz?.map((q) => (
                        <CourseSectionQuiz
                          contentTypeResp={props.contentTypeResp}
                          setContentQuiz={props.setContentQuiz}
                          quizContent={props.contentQuiz}
                          quiz={q}
                          quizData={props.quizResp}
                          activeIndex={props.activeIndex}
                          contentData={props.contentData}
                          setContentData={props.setContentData}
                          setActiveIndex={props.setActiveIndex}
                        />
                      ))}

                    {section.content &&
                      section.content.map((content) => (
                        <CourseSectionContent
                          contentQuiz={props.contentQuiz}
                          setContentQuiz={props.setContentQuiz}
                          content={content}
                          quizData={props.quizResp}
                          activeIndex={props.activeIndex}
                          contentData={props.contentData}
                          setContentData={props.setContentData}
                          setActiveIndex={props.setActiveIndex}
                          contentTypeResp={props.contentTypeResp}
                        />
                      ))}

                    {(!section.content || section.content?.length === 0) &&
                      (!section.quiz || section.quiz?.length === 0) && (
                        <EmptyCourseContentInitial
                          id_section={section.id_section}
                          quizData={props.quizResp}
                          contentTypeResp={props.contentTypeResp}
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
