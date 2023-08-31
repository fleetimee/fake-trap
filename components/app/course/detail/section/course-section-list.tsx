"use client"

import React from "react"

import { CourseOneResSection } from "@/types/course/res/course-get-one"
import { AccordionTrigger } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet } from "@/components/ui/sheet"

interface CourseSectionListProps {
  item: CourseOneResSection
}

export function CourseSectionList({ item }: CourseSectionListProps) {
  const [isEditSectionOpen, setIsEditSectionOpen] =
    React.useState<boolean>(false)

  const [isDeleteSectionOpen, setIsDeleteSectionOpen] =
    React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AccordionTrigger className="font-heading text-base font-bold">
            {item.section_title}
          </AccordionTrigger>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            ID Section: {item.id_section}
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            {item.section_title}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem inset disabled>
            Edit Section
          </ContextMenuItem>
          <ContextMenuItem inset disabled className="text-red-500">
            Delete Section
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Sheet>
  )
}
