import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { RefreshCcw } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getSetting } from "@/lib/fetcher/setting-fetcher"
import { getStrukturOrganisasi } from "@/lib/fetcher/struktur-organisasi-fetcher"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoStringWithTime } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { StrukturOrganisasiTableShell } from "@/components/shell/struktur-organisasi-table-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

  const [strukturOrgResp, setting] = await Promise.all([
    getStrukturOrganisasi({
      token: user?.token,
      page: pageInitial,
      limit: limitinitial,
      nama: namaInitial,
      jabatan: jabatanInitial,
      kodeKantor: kodeKantorInitial,
      unitKerja: unitKerjaInitial,
      sortField: sortField,
      orderBy: sortOrder,
    }),
    getSetting({
      token: user?.token,
      key: "last_sync_struktur_organisasi",
    }),
  ])

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

      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Struktur Organisasi"
          description="Struktur Organisasi yang disync dari Database HRMIS, jadi akan selalu up to date dengan data terbaru."
        />

        <StrukturOrganisasiSyncButton />
      </div>

      <Alert variant="destructive">
        <RefreshCcw className="mr-2 h-4 w-4" />
        <AlertTitle>Terakhir disinkronkan:</AlertTitle>
        <AlertDescription>
          {convertDatetoStringWithTime(setting?.data?.value.toString()) ??
            "Belum pernah disinkronkan"}
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
