"use client"

import React from "react"
import { RocketIcon } from "@radix-ui/react-icons"

import { Content } from "@/types/content-res"
import { CourseByIdResponse } from "@/types/course-res"
import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import { QuizRes } from "@/types/quiz-res"
import { UserResponse } from "@/types/user-res"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"

import { DetailSidebarCourse } from "../detail-sidebar-course"
import { CourseDetailContent } from "./course-detail-content"

export function CourseDetailShell(props: {
  courseKnowledgeResp: KnowledgeByIdResponse
  courseDataResp: CourseByIdResponse
  userDataResp: UserResponse
  quizResp: QuizRes
}) {
  const [contentData, setContentData] = React.useState<Content>({
    content_title: "",
    content_type: 0,
    id_content: 0,
    id_section: 0,
    image: "",
    link: "",
  })

  const [activeIndex, setActiveIndex] = React.useState<string>("")

  return (
    <>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard/course",
            title: "Kursus",
          },
          {
            title: props.courseDataResp.data.course_name,
            href: `/dashboard/knowledge/${props.courseDataResp.data.id_course}`,
          },
        ]}
      />

      <div className="flex flex-row gap-4 px-2">
        <Alert className="basis-full">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Kursus ini berdasarkan pada pengetahuan{" "}
            <span className="font-bold">
              {props.courseKnowledgeResp.data.knowledge_title}
            </span>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <CourseDetailContent
          data={props.courseDataResp}
          user={props.userDataResp}
          setContentData={setContentData}
          contentData={contentData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <DetailSidebarCourse
          dataKnowledge={props.courseKnowledgeResp}
          dataCourse={props.courseDataResp}
          dataQuiz={props.quizResp}
          setContentData={setContentData}
          contentData={contentData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </>
  )
}
