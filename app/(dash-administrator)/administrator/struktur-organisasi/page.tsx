import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

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

  const { page, per_page, sort, nama, jabatan, kodeKantor, unitKerja } =
    searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitinitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "soid"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const namaInitial = typeof nama === "string" ? nama : ""
  const jabatanInitial = typeof jabatan === "string" ? jabatan : ""
  const kodeKantorInitial = typeof kodeKantor === "string" ? kodeKantor : ""
  const unitKerjaInitial = typeof unitKerja === "string" ? unitKerja : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

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

      <DashboardHeader
        heading="Struktur Organisasi"
        description="
              Struktur Organisasi yang disync dari Database HRMIS, jadi akan selalu up to date dengan data terbaru. 
              "
      />
    </DashboardShell>
  )
}
