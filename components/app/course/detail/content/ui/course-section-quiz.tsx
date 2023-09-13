import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CourseOneResQuiz } from "@/types/course/res"
import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { QuizListRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import {
  AddCourseContentSheet,
  AddCourseQuizSheet,
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

interface CourseSectionQuizProps {
  quiz: CourseOneResQuiz
  setContentQuiz: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  quizContent: CourseOneResQuiz
  quizData: QuizListRes
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  contentData: KnowledgeOneResContent
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  contentTypeResp: ReferenceListRes
}

export function CourseSectionQuiz({ ...props }: CourseSectionQuizProps) {
  const [isAddContentOpen, setIsAddContentOpen] = React.useState<boolean>(false)

  const [isAddQuizOpen, setIsAddQuizOpen] = React.useState<boolean>(false)

  const [isEditContentOpen, setIsEditContentOpen] =
    React.useState<boolean>(false)

  const [isDeleteContentOpen, setIsDeleteContentOpen] =
    React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const quizId = searchParams.get("quizId") ?? "1"

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        quizId: props.quizContent.id_quiz.toString(),
      })}`,
      {
        scroll: false,
      }
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.quizContent.id_quiz])

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

                props.setContentData({
                  content_title: "",
                  content_type: "",
                  id_content: 0,
                  id_section: 0,
                  image: "",
                  link: "",
                  created_at: new Date(),
                  updated_at: new Date(),
                })

                props.setContentQuiz(props.quiz)

                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                })
              }}
            >
              <>{props.quiz.quiz_title}</>
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
        </ContextMenuContent>
      </ContextMenu>
      {isAddContentOpen ? (
        <AddCourseContentSheet
          id_section={props.quiz.id_section}
          open={open}
          setOpen={setOpen}
          contentTypeResp={props.contentTypeResp}
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
