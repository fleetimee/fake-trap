import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"





interface DeleteSectionContentSheetProps {
  item: KnowledgeOneResContent
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteSectionContentSheet({
  item,
  setOpen,
}: DeleteSectionContentSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)

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
        sonnerToast.success("Berhasil", {
          description: "Konten berhasil dihapus",
        })

        router.refresh()
        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Konten gagal dihapus",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: "Konten gagal dihapus",
      })
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
