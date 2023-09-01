"use client"

import React from "react"

import { CourseOneResSection } from "@/types/course/res"
import {
  DeleteSection,
  EditSectionSheet,
} from "@/components/app/course/detail/section/operations"
import { AccordionTrigger } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

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
          <SheetTrigger
            className="w-full"
            id="edit-section"
            asChild
            onClick={() => {
              setIsEditSectionOpen(true)
              setIsDeleteSectionOpen(false)
            }}
          >
            <ContextMenuItem inset>Edit Section</ContextMenuItem>
          </SheetTrigger>
          <SheetTrigger
            className="w-full"
            id="delete-section"
            asChild
            onClick={() => {
              setIsDeleteSectionOpen(true)
              setIsEditSectionOpen(false)
            }}
          >
            <ContextMenuItem inset className="text-red-500">
              Delete Section
            </ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {isEditSectionOpen ? (
        <EditSectionSheet item={item} open={open} setOpen={setOpen} />
      ) : (
        <DeleteSection item={item} open={open} setOpen={setOpen} />
      )}
    </Sheet>
  )
}
