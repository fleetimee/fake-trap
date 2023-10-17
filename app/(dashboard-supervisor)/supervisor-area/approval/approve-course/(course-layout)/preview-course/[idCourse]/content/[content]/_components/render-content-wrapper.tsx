"use client"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { renderContentCourse } from "@/components/render-content"

interface RenderContentWrapperProps {
  contentType: string
  contentData: KnowledgeOneResContent
  courseDataResp: CourseOneRes
}

export default function RenderContentWrapper({
  contentData,
  contentType,
  courseDataResp,
}: RenderContentWrapperProps) {
  return renderContentCourse({
    contentType,
    contentData,
    courseDataResp,
  })
}
