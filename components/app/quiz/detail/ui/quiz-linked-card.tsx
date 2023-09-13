"use client"

import Link from "next/link"

import { QuizLinkedListData } from "@/types/quiz/res"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizLinkedCardProps {
  code: number
  data: QuizLinkedListData
}

export function QuizLinkedCard({ code, data }: QuizLinkedCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Link Kuis Ke Kursus</CardTitle>
        <CardDescription>
          Apakah kuis ini sudah di linkan ke kursus ?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start space-x-4">
          <div>
            {code !== 404 ? (
              <Link href={`/dashboard/course/${data.id_course}`}>
                <p className="font-heading text-lg underline hover:text-blue-600">
                  {data.course_name}
                </p>
              </Link>
            ) : (
              <p className="font-heading text-lg">Belum ada</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
