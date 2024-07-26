import { DashboardShell } from "@/components/shell"
import { BreadcrumbSkeleton } from "@/components/skeletons/breadcrumb-skeleton"
import DashboardHeaderSkeleton from "@/components/skeletons/dashboard-header-skeleton"
import {
  AlertDescriptionSkeleton,
  AlertSkeleton,
  AlertTitleSkeleton,
} from "@/components/ui/alert-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function PesertaLoading() {
  return (
    <DashboardShell>
      <BreadcrumbSkeleton />

      <DashboardHeaderSkeleton />

      <AlertSkeleton>
        <AlertTitleSkeleton />
        <AlertDescriptionSkeleton />
      </AlertSkeleton>

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        style={{ marginTop: "1rem" }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow">
            <Skeleton className="mb-4 h-8 w-8 rounded-full" />
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <div className="h-fit rounded-none bg-white p-4 shadow md:rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center">
              <Skeleton className="mr-2 h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mt-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="h-fit rounded-none bg-white p-4 shadow md:rounded-lg lg:col-span-3">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mt-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>

        <div className="h-fit rounded-none bg-white p-4 shadow md:rounded-lg lg:col-span-4">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mt-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
