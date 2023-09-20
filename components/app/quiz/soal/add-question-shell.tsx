"use client"

import React from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { RocketIcon } from "@radix-ui/react-icons"
import { z } from "zod"

import { QuestionForm } from "@/components/app/quiz/soal/add-question"
import { LottieAnimationQuiz } from "@/components/app/quiz/soal/quiz-lottie-animation"
import { MotionDiv } from "@/components/framer-wrapper"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export function SoalShell(props: {
  idQuiz: string
  token: string | undefined
}) {
  const [parent, enableAnimations] = useAutoAnimate()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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

  async function onSubmit(values: z.infer<typeof formSchemaQuestion>[]) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/question/bulk`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Soal berhasil ditambahkan",
        })

        setQuizzes([])
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Soal gagal ditambahkan",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:col-span-2"
      >
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Guide</AlertTitle>
          <AlertDescription>
            Tambahkan pertanyaan dan jawaban di sebelah kiri, kemudian klik
            tombol <span className="font-semibold">Submit Quiz</span> di sebelah
            kanan untuk menyimpan soal untuk quiz ini.
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <QuestionForm setQuizzes={setQuizzes} idQuiz={props.idQuiz} />
      </MotionDiv>

      {quizzes.length > 0 && (
        <Card className="flex flex-col gap-8 p-5" ref={parent}>
          <div className="flex items-center justify-between">
            <h1 className="font-heading font-semibold">Hasil Soal</h1>
            <Button onClick={() => onSubmit(quizzes)}>Submit Quiz</Button>
          </div>
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <p className="space-y-4 pb-4 text-sm font-semibold leading-none">
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
                    {/* <input type="checkbox" checked={answer.is_correct} /> */}
                    <Checkbox
                      checked={answer.is_correct}
                      disabled={
                        quiz.answers.filter((answer) => answer.is_correct)
                          .length > 0
                      }
                    />
                    <p className="text-sm font-medium leading-none">
                      {answer.answer_text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      )}

      {quizzes.length == 0 && (
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card
            className="flex h-full flex-col items-center justify-center gap-8 p-5"
            ref={parent}
          >
            <LottieAnimationQuiz />
            <p className="font-medium leading-none">
              Tambahkan pertanyaan untuk melihat hasil soal
            </p>
          </Card>
        </MotionDiv>
      )}
    </>
  )
}
