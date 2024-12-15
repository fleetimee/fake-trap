"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CompletionDialogProps {
  score: string | null
  timeElapsed: string | null
  completedAt: string | null
}

export function CompletionDialog({
  score,
  timeElapsed,
  completedAt,
}: CompletionDialogProps) {
  const [showCompletionDialog, setShowCompletionDialog] = useState(!!score)

  // Reset URL parameters when dialog is closed
  useEffect(() => {
    if (!showCompletionDialog) {
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [showCompletionDialog])

  if (!score) return null

  // Format the completion time to be more readable
  const formatCompletionTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    }).format(date)
  }

  // Get appropriate message based on score
  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Pencapaian Luar Biasa! 🎉"
    if (score >= 60) return "Hasil yang Baik! 💪"
    return "Tetap Semangat! 📚"
  }

  // Get appropriate class based on score
  const getScoreClass = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
      <DialogContent className="sm:max-w-[400px]">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Trophy with animated background */}
          <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700">
            <Trophy className="size-10 text-yellow-600 dark:text-yellow-300" />
            <div className="animate-spin-slow absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-md" />
          </div>

          {/* Score Display */}
          <div className="space-y-1">
            <p
              className={cn(
                "text-4xl font-bold transition-colors",
                getScoreClass(Number(score))
              )}
            >
              {score}
            </p>
            <p className="text-sm text-muted-foreground">Nilai Anda</p>
          </div>

          {/* Completion Details */}
          <div className="w-full space-y-3 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" />
                <span>Waktu</span>
              </div>
              <span className="font-medium">{timeElapsed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>Selesai</span>
              </div>
              <span className="font-medium">
                {completedAt ? formatCompletionTime(completedAt) : "-"}
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="font-medium">{getScoreMessage(Number(score))}</p>

          <Button
            className="w-full"
            onClick={() => setShowCompletionDialog(false)}
          >
            Kembali
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
