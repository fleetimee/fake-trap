"use client"

import { QuizOneResData } from "@/types/quiz/res"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizDescriptionCardProps {
  data: QuizOneResData
}

export function QuizDescriptionCard({ data }: QuizDescriptionCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Deskripsi Ujian</CardTitle>
        <CardDescription>Deskripsi ujian dimuat disini</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start space-x-4">
          <div>
            <p className="text-sm text-muted-foreground">{data.quiz_desc}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
