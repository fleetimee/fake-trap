"use client"

import { PDFViewer as PDF } from "@react-pdf/renderer"

import {
  QuizOneResData,
  QuizQuestionListResData,
  QuizUserResultListResData,
} from "@/types/quiz/res"
import MyDocument from "@/components/pdf-maker"

interface PdfResultProps {
  getQuizLesson: QuizQuestionListResData[]
  getOneQuiz: QuizOneResData
  getUserSelectedAnswer: QuizUserResultListResData[]
}

export function PdfResult({
  getUserSelectedAnswer,
  getOneQuiz,
  getQuizLesson,
}: PdfResultProps) {
  return (
    <PDF className="h-screen w-full">
      <MyDocument
        getQuizLesson={getQuizLesson}
        getOneQuiz={getOneQuiz}
        getUserSelectedAnswer={getUserSelectedAnswer}
      />
    </PDF>
  )
}
