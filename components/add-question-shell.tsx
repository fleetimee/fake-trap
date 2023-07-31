"use client"

import React from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { z } from "zod"

import { QuestionForm } from "./add-question"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function SoalShell() {
  const [parent, enableAnimations] = useAutoAnimate()

  const formSchemaQuestion = z.object({
    id_quiz: z.number(),
    question_text: z.string().nonempty(),
    answers: z.array(
      z.object({
        answer_text: z.string().nonempty(),
        is_correct: z.boolean().default(false).optional(),
      })
    ),
  })

  const [quizzes, setQuizzes] = React.useState<
    z.infer<typeof formSchemaQuestion>[]
  >([])

  function deleteQuestion(index: number) {
    setQuizzes((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <QuestionForm setQuizzes={setQuizzes} />

      <Card className="flex flex-col gap-8 p-5" ref={parent}>
        <div className="flex items-center justify-between">
          <h1 className="font-heading font-semibold">Soal</h1>
          <Button>Submit Quiz</Button>
        </div>

        {quizzes.map((quiz, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <p className="space-y-4 pb-4 text-sm font-medium leading-none">
                {index + 1}. {quiz.question_text}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteQuestion(index)}
              >
                Hapus
              </Button>
            </div>
            <ul className="grid list-inside list-disc grid-cols-2 gap-4">
              {quiz.answers.map((answer, index) => (
                <li key={index} className="flex items-center gap-3">
                  <input type="checkbox" checked={answer.is_correct} />
                  <p className="text-sm font-medium leading-none">
                    {answer.answer_text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </>
  )
}
