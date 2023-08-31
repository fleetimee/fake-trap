import { KnowledgeOneResSection } from "@/types/knowledge/res"
import { AccordionTrigger } from "@/components/ui/accordion"

interface CourseKnowledgeSectionListProps {
  section: KnowledgeOneResSection
}

export function CourseKnowledgeSectionList({
  section,
}: CourseKnowledgeSectionListProps) {
  return (
    <AccordionTrigger className="font-heading text-base font-bold">
      {section.section_title}
    </AccordionTrigger>
  )
}
