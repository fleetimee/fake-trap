import React from "react"

import { CourseOneResQuiz } from "@/types/course/res/course-get-one"
import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface CourseKnowledgeSectionContentProps {
  content: KnowledgeOneResContent
  contentData: KnowledgeOneResContent
  contentQuiz: CourseOneResQuiz
  setContentQuiz: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
}

export function CourseKnowledgeSectionContent({
  ...props
}: CourseKnowledgeSectionContentProps) {
  return (
    <AccordionContent key={props.content.id_content} className="py-1">
      <Button
        className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading active:bg-gray-800"
        disabled={props.activeIndex == `knowledge-${props.content.id_content}`}
        onClick={() => {
          props.setActiveIndex(`knowledge-${props.content.id_content}`)

          props.setContentQuiz({
            id_quiz: 0,
            quiz_title: "",
            quiz_type: "",
            id_section: 0,
            quiz_desc: "",
            created_at: new Date(),
          })

          props.setContentData(props.content)

          window.scrollTo({
            top: 0,
            behavior: "instant",
          })
        }}
      >
        {props.content.content_title}
      </Button>
    </AccordionContent>
  )
}
