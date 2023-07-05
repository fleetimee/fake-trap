"use client"

import React from "react"

import { Section } from "@/types/section-res"
import { AccordionTrigger } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet } from "@/components/ui/sheet"

export function CourseSectionList(props: { item: Section }) {
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
            {props.item.section_title}
          </AccordionTrigger>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            ID Section: {props.item.id_section}
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
