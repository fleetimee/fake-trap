import Link from "next/link"

import { UserQuizGroupedRes } from "@/types/me/res"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizGroupedProps {
  quizGrouped: UserQuizGroupedRes
}

export function QuizGrouped({ quizGrouped }: QuizGroupedProps) {
  return (
    <Card className="col-span-7 flex  min-h-[370px]  flex-col gap-4 p-4 xl:col-span-3">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-light">Quiz Anda</h1>

        <Link href={`/dashboard/me/averaged-quiz`}>
          <Button variant="outline">Lihat semua</Button>
        </Link>
      </div>

      {quizGrouped.data?.map((quiz) => (
        <Link href={`/dashboard/me/quiz/${quiz.id_quiz}`} key={quiz.id_quiz}>
          <Card className="max-h-none flex-grow overflow-clip">
            <AspectRatio ratio={21 / 9}>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
              <Badge
                className={cn(
                  "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
                  quiz.quiz_type === "PRE TEST"
                    ? "border-green-600/20 bg-green-50 text-green-700"
                    : "border-red-600/10 bg-red-50 text-red-700"
                )}
              >
                {quiz.quiz_type ? "Pre Test" : "Other"}
              </Badge>
              <div
                className="h-full rounded-t-md border-b"
                style={getRandomPatternStyle(String(quiz.quiz_title))}
              />
            </AspectRatio>
            <CardHeader>
              <CardTitle className="line-clamp-1 text-lg">
                {quiz.quiz_title}
              </CardTitle>
              {quiz.quiz_desc ? (
                <CardDescription className="line-clamp-2">
                  {quiz.quiz_desc}
                </CardDescription>
              ) : null}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </Card>
  )
}
