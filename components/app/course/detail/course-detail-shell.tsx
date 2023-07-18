"use client"

import React from "react"
import Link from "next/link"
import { RocketIcon } from "@radix-ui/react-icons"

import { Content } from "@/types/content-res"
import { CourseByIdResponse } from "@/types/course-res"
import {
  Knowledge,
  KnowledgeByIdResponse,
  KnowledgeByIdSectionContentData,
} from "@/types/knowledge-res"
import { QuizRes } from "@/types/quiz-res"
import { UserResponse } from "@/types/user-res"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { DetailSidebarCourse } from "../detail-sidebar-course"
import { CourseDetailContent } from "./course-detail-content"

export function CourseDetailShell(props: {
  courseKnowledgeResp: KnowledgeByIdResponse
  courseDataResp: CourseByIdResponse
  userDataResp: UserResponse
  quizResp: QuizRes
}) {
  const [contentKnowledgeData, setContentKnowledgeData] =
    React.useState<KnowledgeByIdSectionContentData>({
      content_title: "",
      content_type: 0,
      id_content: 0,
      id_section: 0,
      image: "",
      link: "",
    })

  const [contentCourseData, setContentCourseData] = React.useState<Content>({
    content_title: "",
    content_type: 0,
    id_content: 0,
    id_section: 0,
    image: "",
    link: "",
  })

  const [knowledgeActiveIndex, setKnowledgeActiveIndex] =
    React.useState<number>(0)

  const [courseActiveIndex, setCourseActiveIndex] = React.useState<number>(0)

  return (
    <>
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
        />
        <DetailSidebarCourse
          dataKnowledge={props.courseKnowledgeResp}
          dataCourse={props.courseDataResp}
          dataQuiz={props.quizResp}
        />
      </div>
    </>
  )
}
