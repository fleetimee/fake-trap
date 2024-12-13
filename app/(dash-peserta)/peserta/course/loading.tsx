import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/course",
            title: "Pembelajaran",
          },
        ]}
      />

      <DashboardHeader
        heading="Pembelajaran Kamu"
        description="Ini merupakan pembelajaran yang kamu ikuti"
      />

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 space-y-2 p-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
