import React from "react"

import { CourseOneRes, CourseOneResQuiz } from "@/types/course/res"
import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { UserListRes } from "@/types/user/res"
import {
  BookmarkButton,
  LinkButton,
  PdfDownloadButton,
  VideoDownloadButton,
} from "@/components/buttons-header"
import {
  DefaultRender,
  LinkRender,
  PdfRender,
  YoutubeRender,
} from "@/components/content-renderer"

interface RenderContentProps {
  detailKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  contentType: string
}

export function renderContent({
  detailKnowledge,
  contentData,
  contentType,
}: RenderContentProps) {
  switch (contentType) {
    case "":
      return (
        <DefaultRender
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${detailKnowledge.data.image}`}
          alt={detailKnowledge.data.knowledge_title}
        />
      )

    case "0012":
      return <YoutubeRender link={contentData.link} />

    case "0013":
      return <PdfRender link={contentData.link} />

    case "0014":
      return (
        <LinkRender
          link={contentData.link}
          image={`${process.env.NEXT_PUBLIC_BASE_URL}${detailKnowledge.data.image}`}
          alt={detailKnowledge.data.knowledge_title}
        />
      )

    default:
      return null
  }
}

interface RenderContentButtonProps {
  link: string
  contentType: string
}

export function renderContentButton({
  contentType,
  link,
}: RenderContentButtonProps) {
  switch (contentType) {
    case "0012":
      return <VideoDownloadButton link={link} />

    case "0013":
      return <PdfDownloadButton link={link} />

    case "0014":
      return <LinkButton link={link} />

    case "0017":
      return <BookmarkButton />

    default:
      return null
  }
}

interface RenderContentCourseProps {
  contentType: string
  courseDataResp: CourseOneRes
  userDataResp?: UserListRes
  contentData: KnowledgeOneResContent
  contentQuiz?: CourseOneResQuiz
  setContentQuiz?: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  setContentData?: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex?: string
  setActiveIndex?: React.Dispatch<React.SetStateAction<string>>
}

export function renderContentCourse({ ...props }: RenderContentCourseProps) {
  switch (props.contentType) {
    case "":
      return (
        <DefaultRender
          image={props.courseDataResp.data.image}
          alt={props.courseDataResp.data.course_name}
        />
      )

    case "0012":
      return <YoutubeRender link={props.contentData.link} />

    case "0013":
      return <PdfRender link={props.contentData.link} />

    case "0014":
      return (
        <LinkRender
          link={props.contentData.link}
          image={props.courseDataResp.data.image}
          alt={props.courseDataResp.data.course_name}
        />
      )

    default:
      return null
  }
}
