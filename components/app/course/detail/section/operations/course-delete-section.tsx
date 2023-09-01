import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { CourseOneResSection } from "@/types/course/res"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"

interface DeleteSectionProps {
  idSection: number
  token: string | undefined
}

async function deleteSection({ idSection, token }: DeleteSectionProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    toast({
      title: "Berhasil",
      description: "Section berhasil dihapus",
    })

    return true
  } else {
    toast({
      title: "Gagal",
      description: "Section gagal dihapus",
      variant: "destructive",
    })

    return false
  }
}

interface DeleteSectionSheetProps {
  item: CourseOneResSection
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteSection({
  item,
  open,
  setOpen,
}: DeleteSectionSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${item.id_section}`,
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
        <SheetTitle>Hapus Section</SheetTitle>
        <SheetDescription>
          Aksi ini tidak dapat dibatalkan. Section akan dihapus permanen. Apakah
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
