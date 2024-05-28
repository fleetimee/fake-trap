"use client"

import { QuizLinkedListData } from "@/types/quiz/res"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
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
  const linkedCheck = code === 200

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hubungkan ke pembelajaran</CardTitle>
        <CardDescription>
          Apakah ujian ini sudah di hubungkan ke pembelajaran ?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex  items-start  space-x-4">
          <div
            className={cn(
              "-mx-2 flex items-start space-x-4 rounded-md  p-2 transition-all",
              linkedCheck
                ? "bg-accent"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icons.check
              className={cn(
                "mt-px h-5 w-5",
                !linkedCheck ? "text-foreground" : "text-green-600"
              )}
            />
            <div className="space-y-1">
              <p
                className={cn(
                  "text-sm font-medium leading-none",
                  !linkedCheck ? "line-through" : ""
                )}
              >
                Sudah
              </p>
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  !linkedCheck ? "line-through" : ""
                )}
              >
                Ujian ini sudah dihubungkan ke pembelajaran.
              </p>
            </div>
          </div>
          <div
            className={cn(
              "-mx-2 flex items-start space-x-4 rounded-md  p-2 transition-all",
              !linkedCheck
                ? "bg-accent"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icons.close
              className={cn(
                "mt-px h-5 w-5",
                linkedCheck ? "text-foreground" : "text-red-600"
              )}
            />
            <div className="space-y-1">
              <p
                className={cn(
                  "text-sm font-medium leading-none",
                  linkedCheck ? "line-through" : ""
                )}
              >
                Belum
              </p>

              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  linkedCheck ? "line-through" : ""
                )}
              >
                Ujian ini belum dihubungkan ke pembelajaran.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
