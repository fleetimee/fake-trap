import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getAuditTrail } from "@/lib/fetcher/audit-trail-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { AuditTrailTableShell } from "@/components/shell/audit-trail-table-shell"

export const metadata: Metadata = {
  title: "Audit Trail",
  description: "Audit Trail",
}

interface AdminAuditTrailPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AdminAuditTrailPage({
  searchParams,
}: AdminAuditTrailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, method, from, to } = searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10

  const sortByInitial = typeof sort === "string" ? sort : "id"
  const orderByInitial = typeof sort === "string" ? sort : "desc"

  const methodInitial = typeof method === "string" ? method : ""
  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

  const sortField = sortByInitial.split(".")[0]
  const sortOrder = orderByInitial.split(".")[1]

  const auditTrail = await getAuditTrail({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    method: methodInitial,
    sortField: sortField,
    orderBy: sortOrder,
    from: fromInitial,
    to: toInitial,
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
            href: "/administrator/audit-trail",
            title: "Audit Trail",
          },
        ]}
      />

      <DashboardHeader
        heading="Audit Trail"
        description="
            Audit Trail digunakan untuk melihat aktivitas pengguna dalam melakukan aksi pada aplikasi. Anda dapat melihat aktivitas pengguna dalam melakukan aksi pada aplikasi"
      />

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <AuditTrailTableShell
          data={auditTrail.data}
          pageCount={auditTrail.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
