"use client"

import React from "react"

import { KnowledgeByIdSectionData } from "@/types/knowledge-res"
import { AccordionTrigger } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function KnowledgeSectionList(props: {
  item: KnowledgeByIdSectionData
}) {
  const [isEditSectionOpen, setIsEditSectionOpen] =
    React.useState<boolean>(false)
  const [isDeleteSectionOpen, setIsDeleteSectionOpen] =
    React.useState<boolean>(false)

  return (
    <Sheet>
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
          <ContextMenuItem inset disabled>
            {props.item.section_title}
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
              Hapus Section
            </ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {isEditSectionOpen ? (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Section</SheetTitle>
            <SheetDescription>Edit Section</SheetDescription>
          </SheetHeader>
        </SheetContent>
      ) : (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Delete Section</SheetTitle>
            <SheetDescription>Delete Section</SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  )
}
