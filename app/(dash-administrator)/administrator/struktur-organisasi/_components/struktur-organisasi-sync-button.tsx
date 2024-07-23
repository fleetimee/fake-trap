"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { FolderSyncIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { syncStrukturOrganisasi } from "@/lib/fetcher/struktur-organisasi-fetcher"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function StrukturOrganisasiSyncButton() {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const [open, setOpen] = useState(false)

  const router = useRouter()

  if (!session) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <FolderSyncIcon className="mr-2 h-4 w-4" />
          Sync
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Data Struktur Organisasi akan di Sync secara manual
          </AlertDialogTitle>
          <AlertDialogDescription>
            Data Struktur Organisasi akan di Sync secara manual, pastikan
            koneksi internet stabil
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={async (event) => {
              event.preventDefault()

              startTransition(async () => {
                const res = await syncStrukturOrganisasi({
                  token: session.user.token,
                })

                if (res.code === 200) {
                  sonnerToast.success("Proses sinkronisasi berhasil")
                  setOpen(false)
                  router.push(
                    "/administrator/struktur-organisasi?isSuccessSync=true"
                  )
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal sinkronisasi")
                }
              })
            }}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Sync</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
