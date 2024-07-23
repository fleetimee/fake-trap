"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FolderSyncIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { SyncStrukturRes } from "@/types/audit-trail/res/audit-trail-sync"
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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function StrukturOrganisasiSyncButton() {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const [fetchData, setFetchData] = useState<SyncStrukturRes>({
    code: 0,
    message: "",
    data: {
      elapsed_Time: "",
      rows_deleted: 0,
      rows_inserted: 0,
    },
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("isSuccessSync")

  if (!session) {
    return null
  }

  return (
    <>
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

                  setFetchData(res)

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
      <AlertDialog open={Boolean(search)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>🎉 Berhasil</AlertDialogTitle>
            <AlertDialogDescription>
              Struktur Organisasi berhasil disinkronkan dengan DB HRMIS, data
              sudah up to date
              <Separator className="my-4" />
              <div className="my-4" />
              <code
                className="rounded-lg bg-gray-100 p-4 text-sm"
                style={{ display: "block" }}
              >
                <ul>
                  <li>
                    <strong>Code:</strong> {fetchData.code}
                  </li>
                  <li>
                    <strong>Message:</strong> {fetchData.message}
                  </li>
                  <li>
                    <strong>Time Elapsed:</strong> {fetchData.data.elapsed_Time}
                  </li>
                  <li>
                    <strong>Data Dihapus:</strong> {fetchData.data.rows_deleted}
                  </li>
                  <li>
                    <strong>Data Ditambahkan:</strong>
                    {fetchData.data.rows_inserted}
                  </li>
                </ul>
              </code>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                router.push("/administrator/struktur-organisasi")
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
