"use client"

import Link from "next/link"

import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"





interface QuizStagingProps {
  quizName: string
  quizId: number
  courseId: string
}

export function QuizStaging({ quizName, quizId, courseId }: QuizStagingProps) {
  return (
    <EmptyContent className="min-h-[400px]">
      <EmptyContent.Icon name="comment" />
      <EmptyContent.Title>Mulai Quiz Ini ?</EmptyContent.Title>
      <EmptyContent.Description className="text-lg italic">
        {quizName}
      </EmptyContent.Description>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="mt-4 w-full" variant="secondary">
            Mulai Quiz
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin Mulai ?</AlertDialogTitle>
            <AlertDialogDescription>
              Setelah Quiz di mulai, tidak dapat di ulang
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>
              <Link
                href={`
                /member-area/course/${courseId}/quiz/${quizId}/quiz-start
            `}
              >
                Lanjut
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ul className="list-inside list-disc ">
        <EmptyContent.Description className="text-left">
          <li>Waktu Quiz hanya 30 menit </li>
          <li>Quiz hanya dapat di kerjakan sekali </li>
          <li>Quiz tidak dapat di ulang </li>
        </EmptyContent.Description>
      </ul>
    </EmptyContent>
  )
}
