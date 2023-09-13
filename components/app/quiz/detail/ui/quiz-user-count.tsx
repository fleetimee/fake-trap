"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizUserCountCardProps {
  userCount: number
}

export function QuizUserCountCard({ userCount }: QuizUserCountCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Peserta</CardTitle>
        <CardDescription>Peserta yang mengikuti kuis ini</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-6xl text-primary">{userCount}</p>
      </CardContent>
    </Card>
  )
}
