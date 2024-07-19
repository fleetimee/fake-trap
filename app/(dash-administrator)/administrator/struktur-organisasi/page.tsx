import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { FolderSyncIcon, RefreshCcw } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getStrukturOrganisasi } from "@/lib/fetcher/struktur-organisasi-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { StrukturOrganisasiTableShell } from "@/components/shell/struktur-organisasi-table-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { StrukturOrganisasiSyncButton } from "./_components/struktur-organisasi-sync-button"

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description: "Struktur Organisasi",
}

interface AdminStrukturOrganisasiPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AdminStrukturOrganisasiPage({
  searchParams,
}: AdminStrukturOrganisasiPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, nama, jabatan, kd_kantor, unitKerja } =
    searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitinitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "soid"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const namaInitial = typeof nama === "string" ? nama : ""
  const jabatanInitial = typeof jabatan === "string" ? jabatan : ""
  const kodeKantorInitial = typeof kd_kantor === "string" ? kd_kantor : ""
  const unitKerjaInitial = typeof unitKerja === "string" ? unitKerja : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const strukturOrgResp = await getStrukturOrganisasi({
    token: user?.token,
    page: pageInitial,
    limit: limitinitial,
    nama: namaInitial,
    jabatan: jabatanInitial,
    kodeKantor: kodeKantorInitial,
    unitKerja: unitKerjaInitial,
    sortField: sortField,
    orderBy: sortOrder,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/administrator",
            title: "Dashboard",
          },
          {
            href: "/administrator/struktur-organisasi",
            title: "Struktur Organisasi",
          },
        ]}
      />

      <div
        className="
        flex items-center justify-between
      "
      >
        <DashboardHeader
          heading="Struktur Organisasi"
          description="Struktur Organisasi yang disync dari Database HRMIS, jadi akan selalu up to date dengan data terbaru."
        />

        <AlertDialog>
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
              <StrukturOrganisasiSyncButton />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Alert variant="destructive">
        <RefreshCcw className="mr-2 h-4 w-4" />
        <AlertTitle>Terakhir disinkronkan:</AlertTitle>
        <AlertDescription>
          {new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
        </AlertDescription>{" "}
      </Alert>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <StrukturOrganisasiTableShell
          data={strukturOrgResp.data}
          pageCount={strukturOrgResp.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
