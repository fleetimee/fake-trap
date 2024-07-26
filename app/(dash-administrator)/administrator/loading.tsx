import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DashboardShell } from "@/components/shell"
import { BreadcrumbSkeleton } from "@/components/skeletons/breadcrumb-skeleton"
import DashboardHeaderSkeleton from "@/components/skeletons/dashboard-header-skeleton"

export default function AdminDashboardLoading() {
  return (
    <DashboardShell>
      <BreadcrumbSkeleton />
      <DashboardHeaderSkeleton />

      <DataTableSkeleton columnCount={10} rowCount={10} />
    </DashboardShell>
  )
}
