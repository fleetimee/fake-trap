import { KnowledgeByIdSectionData } from "@/types/knowledge-res"
import { AccordionTrigger } from "@/components/ui/accordion"

export function CourseKnowledgeSectionList(props: {
  section: KnowledgeByIdSectionData
}) {
  return (
    <AccordionTrigger className="font-heading text-base font-bold">
      {props.section.section_title}
    </AccordionTrigger>
  )
}
