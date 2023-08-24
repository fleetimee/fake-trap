import React from "react"
import { useRouter } from "next/navigation"

import { KnowledgeListResData } from "@/types/knowledge/res"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface DeleteKnowledgeButtonProps {
  knowledgeData: KnowledgeListResData
  token: string | undefined
}

export function DeleteKnowledgeButton({
  knowledgeData,
  token,
}: DeleteKnowledgeButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)

  async function deleteKnowledge() {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledgeData.id_knowledge}`,
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
          title: "Berhasil menghapus pengetahuan",
          description: "Pengetahuan berhasil dihapus",
          variant: "default",
        })

        router.refresh()
        setOpen(false)
      } else {
        toast({
          title: "Gagal menghapus pengetahuan",
          description: "Pengetahuan gagal dihapus",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Gagal menghapus pengetahuan",
        description: "Pengetahuan gagal dihapus",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="destructive">Hapus</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Pengetahuan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Apakah anda ingin menghapus pengetahuan ini?
          <p className="font-heading font-semibold">
            {knowledgeData.knowledge_title}
          </p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={deleteKnowledge} variant="destructive">
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
