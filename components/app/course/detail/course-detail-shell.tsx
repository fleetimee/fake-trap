"use client"

import React from "react"
import { RocketIcon } from "@radix-ui/react-icons"

import {
  CourseOneRes,
  CourseOneResQuiz,
} from "@/types/course/res/course-get-one"
import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { QuizListRes } from "@/types/quiz/res"
import { UserListRes } from "@/types/user/res"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { DetailSidebarCourse } from "../detail-sidebar-course"
import { CourseDetailContent } from "./course-detail-content"

interface CourseDetailShellProps {
  courseKnowledgeResp: KnowledgeOneRes
  courseDataResp: CourseOneRes
  userDataResp: UserListRes
  quizResp: QuizListRes
}

export function CourseDetailShell({
  courseKnowledgeResp,
  courseDataResp,
  userDataResp,
  quizResp,
}: CourseDetailShellProps) {
  const [contentData, setContentData] = React.useState<KnowledgeOneResContent>({
    content_title: "",
    content_type: "",
    id_content: 0,
    id_section: 0,
    image: "",
    link: "",
    created_at: new Date(),
    updated_at: new Date(),
  })

  const [contentQuiz, setContentQuiz] = React.useState<CourseOneResQuiz>({
    id_quiz: 0,
    quiz_title: "",
    quiz_type: "",
    id_section: 0,
    quiz_desc: "",
    created_at: new Date(),
  })

  const [activeIndex, setActiveIndex] = React.useState<string>("")

  return (
    <>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/course",
            title: "Kursus",
          },
          {
            title: courseDataResp.data.course_name,
            href: `/dashboard/knowledge/${courseDataResp.data.id_course}`,
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
              {courseKnowledgeResp.data.knowledge_title}
            </span>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <CourseDetailContent
          courseDataResp={courseDataResp}
          userDataResp={userDataResp}
          setContentData={setContentData}
          contentData={contentData}
          contentQuiz={contentQuiz}
          setContentQuiz={setContentQuiz}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <DetailSidebarCourse
          contentQuiz={contentQuiz}
          setContentQuiz={setContentQuiz}
          courseDataResp={courseDataResp}
          quizResp={quizResp}
          courseKnowledgeResp={courseKnowledgeResp}
          setContentData={setContentData}
          contentData={contentData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </>
  )
}
