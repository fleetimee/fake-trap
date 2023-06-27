import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function CourseKnowledgeSectionContent(props: {
  content: KnowledgeByIdSectionContentData
}) {
  return (
    <AccordionContent key={props.content.id_content} className="py-1">
      <Button className="flex h-[65px] w-full justify-start rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
        {props.content.content_title}
      </Button>
    </AccordionContent>
  )
}
