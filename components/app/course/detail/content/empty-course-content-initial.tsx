"use client"

import React from "react"

import { QuizRes } from "@/types/quiz-res"
import { QuizListRes } from "@/types/quiz/res"
import { EmptyContent } from "@/components/app/knowledge/detail/ui/knowledge-detail-sidebar-empty"
import { AccordionContent } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { AddCourseContentSheet } from "./create-course-section-content-sheet"
import { AddCourseQuizSheet } from "./create-course-section-quiz-sheet"

interface EmptyCourseContentInitialProps {
  id_section: number
  quizData: QuizListRes
}

export function EmptyCourseContentInitial({
  id_section,
  quizData,
}: EmptyCourseContentInitialProps) {
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
          id_section={id_section}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <AddCourseQuizSheet
          id_section={id_section}
          quizData={quizData}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Sheet>
  )
}
