"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { KnowledgeByIdSectionData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function DeleteSectionSheet(props: {
  item: KnowledgeByIdSectionData
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${props.item.id_section}`,
        {
          method: "DELETE",
          headers: headersObj,
        }
      )

      console.log(response)

      if (response.ok) {
        toast({
          title: "Berhasil menghapus section",
          description: "Section berhasil dihapus",
        })

        router.refresh()
        props.setOpen(false)
      } else {
        toast({
          title: "Gagal menghapus section",
          description: `Section gagal dihapus`,
          variant: "destructive",
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
          Apakah anda yakin ingin menghapus section ini?
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
