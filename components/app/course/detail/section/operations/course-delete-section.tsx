import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { CourseOneResSection } from "@/types/course/res"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"





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
    sonnerToast.success("Berhasil", {
      description: "Section berhasil dihapus",
    })

    return true
  } else {
    sonnerToast.error("Gagal", {
      description: "Section gagal dihapus",
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
        sonnerToast.success("Berhasil", {
          description: "Section berhasil dihapus",
        })

        router.refresh()
        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Section gagal dihapus",
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
