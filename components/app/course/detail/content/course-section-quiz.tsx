import React from "react"

import { Content } from "@/types/content-res"
import { QuizData, QuizRes } from "@/types/quiz-res"
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

export function CourseSectionQuiz(props: {
  quiz: QuizData
  quizData: QuizRes
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  contentData: Content
  setContentData: React.Dispatch<React.SetStateAction<Content>>
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
          <AccordionContent key={props.quiz.id_quiz} className="py-1">
            <Button
              disabled={props.activeIndex == `course-${props.quiz.id_quiz}`}
              className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading active:bg-gray-800"
              onClick={() => {
                props.setActiveIndex(`course-${props.quiz.id_quiz}`)
                props.setContentData(props.contentData)

                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                })
              }}
            >
              {props.quiz.quiz_title}
            </Button>
          </AccordionContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            #Kuis
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            ID Kuis: {props.quiz.id_quiz}
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            {`Tipe Kuis: ${props.quiz.quiz_type}`}
          </ContextMenuItem>

          <ContextMenuItem inset disabled>
            {props.quiz.quiz_title}
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
              setIsAddContentOpen(false)
              setIsAddQuizOpen(true)
              setIsEditContentOpen(false)
              setIsDeleteContentOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Kuis</ContextMenuItem>
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
          id_section={props.quiz.id_section}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <AddCourseQuizSheet
          id_section={props.quiz.id_section}
          open={open}
          setOpen={setOpen}
          quizData={props.quizData}
        />
      )}
    </Sheet>
  )
}
