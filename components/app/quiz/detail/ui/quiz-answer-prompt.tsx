"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizAnswerPromptCardProps {
  isAlreadyAnswered: boolean
}

export function QuizAnswerPromptCard({
  isAlreadyAnswered,
}: QuizAnswerPromptCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Pertanyaan</CardTitle>
        <CardDescription>Apakah pertanyaan sudah ditambahkan?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div
          className={cn(
            "-mx-2 flex items-start space-x-4 rounded-md  p-2 transition-all",
            isAlreadyAnswered
              ? "bg-accent"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icons.check
            className={cn(
              "mt-px h-5 w-5",
              !isAlreadyAnswered ? "text-foreground" : "text-green-600"
            )}
          />
          <div className="space-y-1">
            <p
              className={cn(
                "text-sm font-medium leading-none",
                !isAlreadyAnswered ? "line-through" : ""
              )}
            >
              Sudah
            </p>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                !isAlreadyAnswered ? "line-through" : ""
              )}
            >
              Pertanyaan sudah ditambahkan.
            </p>
          </div>
        </div>
        <div
          className={cn(
            "-mx-2 flex items-start space-x-4 rounded-md  p-2 transition-all",
            !isAlreadyAnswered
              ? "bg-accent"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icons.close
            className={cn(
              "mt-px h-5 w-5",
              isAlreadyAnswered ? "text-foreground" : "text-red-600"
            )}
          />
          <div className="space-y-1">
            <p
              className={cn(
                "text-sm font-medium leading-none",
                isAlreadyAnswered ? "line-through" : ""
              )}
            >
              Belum
            </p>

            <p
              className={cn(
                "text-sm text-muted-foreground",
                isAlreadyAnswered ? "line-through" : ""
              )}
            >
              Belum ada pertanyaan untuk ujian ini.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
