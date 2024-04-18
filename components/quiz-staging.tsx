"use client"

import Link from "next/link"

import { EmptyContent } from "@/components/empty"
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

interface QuizAnnouncementProps {
  quizName: string
  link: string
}

export function QuizAnnoucement({ ...props }: QuizAnnouncementProps) {
  return (
    <EmptyContent className="min-h-[400px]">
      <EmptyContent.Icon name="comment" />
      <EmptyContent.Title>Mulai Ujian Ini ?</EmptyContent.Title>
      <EmptyContent.Description className="text-lg italic">
        {props.quizName}
      </EmptyContent.Description>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="mt-4 w-full" variant="secondary">
            Mulai Ujian
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin Mulai ?</AlertDialogTitle>
            <AlertDialogDescription>
              Setelah Ujian di mulai, tidak dapat di ulang
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction>
              <Link href={props.link}>Lanjut</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ul className="list-inside list-disc ">
        <EmptyContent.Description className="text-left">
          <li>Waktu Ujian hanya 30 menit </li>
          <li>Ujian hanya dapat di kerjakan sekali </li>
          <li>Ujian tidak dapat di ulang </li>
        </EmptyContent.Description>
      </ul>
    </EmptyContent>
  )
}
