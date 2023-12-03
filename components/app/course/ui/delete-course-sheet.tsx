import React from "react"
import { useRouter } from "next/navigation"
import { Dialog } from "@radix-ui/react-dialog"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { CourseData } from "@/types/course-res"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"





export function DeleteCourseButton(props: { item: CourseData }) {
  const { data: session } = useSession()

  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${props.item.id_course}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Pelatihan berhasil dihapus",
        })

        router.refresh()
        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Pelatihan gagal dihapus",
        })
      }
    } catch (error) {
      console.error(error)
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
          <DialogTitle>Hapus Pelatihan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Apakah anda ingin menghapus pelatihan ini?
          <p className="font-heading font-semibold">{props.item.course_name}</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit} variant="destructive">
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
