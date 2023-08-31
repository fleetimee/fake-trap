import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import { AccordionContent } from "@/components/ui/accordion"

export function EmptyKnowledgeCourse() {
  return (
    <AccordionContent className="py-4">
      <EmptyContent className="h-[50px]">
        <EmptyContent.Icon name="empty" />
        <EmptyContent.Title>Tidak ada konten</EmptyContent.Title>
      </EmptyContent>
    </AccordionContent>
  )
}
