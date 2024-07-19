"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { syncStrukturOrganisasi } from "@/lib/fetcher/struktur-organisasi-fetcher"
import { AlertDialogAction } from "@/components/ui/alert-dialog"

export function StrukturOrganisasiSyncButton() {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  if (!session) {
    return null
  }

  return (
    <AlertDialogAction
      disabled={isPending}
      onClick={async (event) => {
        event.preventDefault()

        startTransition(async () => {
          const res = await syncStrukturOrganisasi({
            token: session.user.token,
          })

          if (res) {
            sonnerToast.success("Proses sinkronisasi berhasil")
            router.refresh()
          } else {
            sonnerToast.error("Gagal sinkronisasi")
          }
        })
      }}
    >
      {isPending ? "Sedang sinkronisasi..." : "Sinkronisasi"}
    </AlertDialogAction>
  )
}
