import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { CourseOneResContent } from "@/types/course/res"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"

interface DeleteCourseContentSheet {
  item: CourseOneResContent
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteCourseContentSheet({
  item,
  setOpen,
}: DeleteCourseContentSheet) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${item.id_content}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil menghapus konten",
          description: "Konten berhasil dihapus",
        })

        router.refresh()
        setOpen(false)
      } else {
        toast({
          title: "Gagal menghapus konten",
          description: "Konten gagal dihapus",
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Hapus Konten</SheetTitle>
        <SheetDescription>
          Aksi ini tidak dapat dibatalkan. Konten akan dihapus permanen. Apakah
          anda yakin ?
        </SheetDescription>
      </SheetHeader>
      <SheetFooter className="py-8">
        <Button
          type="submit"
          className="w-full"
          variant="destructive"
          onClick={onSubmit}
        >
          {isLoading ? (
            <Icons.spinner className="h-5 w-5 animate-spin" />
          ) : (
            "Hapus"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
