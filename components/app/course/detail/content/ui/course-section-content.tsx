import React from "react"

import { CourseOneResContent, CourseOneResQuiz } from "@/types/course/res"
import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { QuizListRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import {
  AddCourseContentSheet,
  AddCourseQuizSheet,
  DeleteCourseContentSheet,
  EditCourseContentSheet,
} from "@/components/app/course/detail/content/operations"
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

interface QuizSectionContentProps {
  contentQuiz: CourseOneResQuiz
  setContentQuiz: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  content: CourseOneResContent
  quizData: QuizListRes
  activeIndex: string
  contentData: KnowledgeOneResContent
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  contentTypeResp: ReferenceListRes
}

export function CourseSectionContent({ ...props }: QuizSectionContentProps) {
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
            <Button
              className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading active:bg-gray-800"
              disabled={
                props.activeIndex == `course-${props.content.id_content}`
              }
              onClick={() => {
                props.setActiveIndex(`course-${props.content.id_content}`)

                props.setContentQuiz({
                  id_quiz: 0,
                  quiz_title: "",
                  quiz_type: "",
                  id_section: 0,
                  quiz_desc: "",
                  created_at: new Date(),
                })

                props.setContentData(props.content)

                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                })
              }}
            >
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
            Tipe Konten:{" "}
            {
              props.contentTypeResp.data.find(
                (item) => item.code_ref2 == props.content.content_type
              )?.value_ref1
            }
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

          <SheetTrigger
            className="w-full"
            asChild
            id="edit-content"
            onClick={() => {
              setIsEditContentOpen(true)
              setIsAddContentOpen(false)
              setIsAddQuizOpen(false)
              setIsDeleteContentOpen(false)
            }}
          >
            <ContextMenuItem inset>Edit Konten</ContextMenuItem>
          </SheetTrigger>

          <SheetTrigger
            className="w-full"
            asChild
            id="delete-content"
            onClick={() => {
              setIsDeleteContentOpen(true)
              setIsAddContentOpen(false)
              setIsAddQuizOpen(false)
              setIsEditContentOpen(false)
            }}
          >
            <ContextMenuItem inset className="text-red-500">
              Hapus Konten
            </ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {isAddContentOpen ? (
        <AddCourseContentSheet
          id_section={props.content.id_section}
          open={open}
          setOpen={setOpen}
          contentTypeResp={props.contentTypeResp}
        />
      ) : isEditContentOpen ? (
        <EditCourseContentSheet
          item={props.content}
          open={open}
          setOpen={setOpen}
          contentTypeData={props.contentTypeResp}
        />
      ) : isDeleteContentOpen ? (
        <DeleteCourseContentSheet
          item={props.content}
          open={open}
          setOpen={setOpen}
        />
      ) : isAddQuizOpen ? (
        <AddCourseQuizSheet
          id_section={props.content.id_section}
          open={open}
          setOpen={setOpen}
          quizData={props.quizData}
        />
      ) : null}
    </Sheet>
  )
}
