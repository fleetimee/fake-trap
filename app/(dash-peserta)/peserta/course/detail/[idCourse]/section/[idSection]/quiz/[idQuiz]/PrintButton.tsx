"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { toast } from "@/components/ui/use-toast"

interface PrintButtonNilaiProps {
  url: string
  quizTitle: string
  attemptNumber: number
}

export function PrintButtonNilai({
  url,
  quizTitle,
  attemptNumber,
}: PrintButtonNilaiProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrint = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to download file")
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl

      // Format the filename: sanitize quiz title and add attempt number
      const sanitizedQuizTitle = quizTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric characters with hyphens
        .replace(/(^-|-$)/g, "") // Remove leading and trailing hyphens
      const filename = `hasil-${sanitizedQuizTitle}-attempt-${attemptNumber}.pdf`

      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)

      toast({
        title: "Success",
        description: "File berhasil diunduh",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengunduh file",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="group relative"
          onClick={handlePrint}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4 transition-transform group-hover:-translate-y-0.5" />
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-48 text-center text-sm" align="end">
        Unduh hasil percobaan ke-{attemptNumber}
      </HoverCardContent>
    </HoverCard>
  )
}
