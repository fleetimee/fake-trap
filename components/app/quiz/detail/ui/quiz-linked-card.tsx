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
        <CardTitle className="text-lg">Link Kuis Ke Pembelajaran</CardTitle>
        <CardDescription>
          Apakah kuis ini sudah di hubungkan ke pembelajaran ?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start space-x-4">
          <div>
            {code !== 404 ? (
              <p className="font-heading text-lg underline hover:text-blue-600">
                {data.course_name}
              </p>
            ) : (
              <p className="font-heading text-lg">Belum ada</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
