"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Dialog } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export function DeleteStudentsOutOfCourseButton() {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/secure/course/1/users`,
        {
          method: "PATCH",
          headers: headersObj,
        }
      )

      if (response.ok) {
        toast({
          title: "Success",
          description: "User berhasil dihapus dari kursus ini.",
        })

        router.refresh()

        setOpen(false)
      } else {
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return <Dialog open={open} onOpenChange={setOpen}></Dialog>
}
