import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

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
    </DashboardShell>
  )
}
