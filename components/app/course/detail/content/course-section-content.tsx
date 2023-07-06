import React from "react"

import { Content } from "@/types/content-res"
import { QuizRes } from "@/types/quiz-res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { AddCourseContentSheet } from "./create-course-section-content-sheet"
import { AddCourseQuizSheet } from "./create-course-section-quiz-sheet"

export function CourseSectionContent(props: {
  content: Content
  quizData: QuizRes
}) {
  const [isAddContentOpen, setIsAddContentOpen] = React.useState<boolean>(false)

  const [isAddQuizOpen, setIsAddQuizOpen] = React.useState<boolean>(false)

  const [isEditContentOpen, setIsEditContentOpen] =
    React.useState<boolean>(false)

  const [isDeleteContentOpen, setIsDeleteContentOpen] =
    React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AccordionContent key={props.content.id_content} className="py-1">
            <Button className="flex h-[65px] w-full justify-start rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
              {props.content.content_title}
            </Button>
          </AccordionContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            #Konten
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            ID Konten: {props.content.id_content}
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            {`Tipe Konten: ${props.content.content_type}`}
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            {props.content.content_title}
          </ContextMenuItem>

          <ContextMenuSeparator />

          <SheetTrigger
            className="w-full"
            asChild
            id="add-content"
            onClick={() => {
              setIsAddContentOpen(true)
              setIsAddQuizOpen(false)
              setIsEditContentOpen(false)
              setIsDeleteContentOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Konten</ContextMenuItem>
          </SheetTrigger>

          <SheetTrigger
            className="w-full"
            asChild
            id="add-quiz"
            onClick={() => {
              setIsAddQuizOpen(true)
              setIsAddContentOpen(false)
              setIsEditContentOpen(false)
              setIsDeleteContentOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Quiz</ContextMenuItem>
          </SheetTrigger>

          <ContextMenuSeparator />

          <ContextMenuItem inset disabled>
            Edit Konten
          </ContextMenuItem>

          <ContextMenuItem inset disabled className="text-red-500">
            Hapus Konten
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {isAddContentOpen ? (
        <AddCourseContentSheet
          id_section={props.content.id_section}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <AddCourseQuizSheet
          id_section={props.content.id_section}
          open={open}
          setOpen={setOpen}
          quizData={props.quizData}
        />
      )}
    </Sheet>
  )
}
