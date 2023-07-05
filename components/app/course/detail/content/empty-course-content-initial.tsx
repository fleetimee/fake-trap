"use client"

import React from "react"

import { AccordionContent } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { EmptyContent } from "@/components/app/knowledge/detail-sidebar-empty-content"

import { AddCourseContentSheet } from "./create-course-section-content-sheet"
import { AddCourseQuizSheet } from "./create-course-section-quiz-sheet"

export function EmptyCourseContentInitial(props: { id_section: number }) {
  const [isAddContentOpen, setIsAddContentOpen] = React.useState<boolean>(false)

  const [isAddQuizOpen, setIsAddQuizOpen] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AccordionContent className="py-4">
            <EmptyContent className="h-[50px]">
              <EmptyContent.Icon name="empty" />
              <EmptyContent.Title>Tidak ada konten</EmptyContent.Title>
              <EmptyContent.Description>
                Klik kanan untuk menambah konten / quiz
              </EmptyContent.Description>
            </EmptyContent>
          </AccordionContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <SheetTrigger
            className="w-full"
            id="add-content"
            asChild
            onClick={() => {
              setIsAddContentOpen(true)
              setIsAddQuizOpen(false)
              setOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Konten</ContextMenuItem>
          </SheetTrigger>

          <SheetTrigger
            className="w-full"
            id="add-quiz"
            asChild
            onClick={() => {
              setIsAddQuizOpen(true)
              setIsAddContentOpen(false)
              setOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Quiz</ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {isAddContentOpen ? (
        <AddCourseContentSheet
          id_section={props.id_section}
          open={isAddContentOpen}
          setOpen={setOpen}
        />
      ) : (
        <AddCourseQuizSheet />
      )}
    </Sheet>
  )
}
