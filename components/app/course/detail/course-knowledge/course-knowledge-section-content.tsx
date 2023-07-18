import { Content } from "@/types/content-res"
import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function CourseKnowledgeSectionContent(props: {
  content: KnowledgeByIdSectionContentData
  contentData: Content
  setContentData: React.Dispatch<React.SetStateAction<Content>>
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <AccordionContent key={props.content.id_content} className="py-1">
      <Button
        className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading active:bg-gray-800"
        disabled={props.activeIndex == `knowledge-${props.content.id_content}`}
        onClick={() => {
          props.setActiveIndex(`knowledge-${props.content.id_content}`)
          props.setContentData(props.content)

          // go to the top of the page
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
