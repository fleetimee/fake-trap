"use client"

import React from "react"

import { QuestionForm } from "./add-question"
import { Card } from "./ui/card"

export function SoalShell() {
  const [quizzes, setQuizzes] = React.useState([])

  // const addQuiz = (quiz: any) => {
  //     setQuizzes([...quizzes, quiz])
  // }

  return (
    <>
      <QuestionForm />

      <Card className="flex flex-col gap-8 p-5">Penis</Card>
    </>
  )
}
