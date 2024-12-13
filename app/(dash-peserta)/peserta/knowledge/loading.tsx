import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function KnowledgeLoading() {
  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/knowledge",
            title: "Materi Publik",
          },
        ]}
      />

      <DashboardHeader
        heading="Materi Publik"
        description="Materi Terbuka yang dapat diakses oleh semua peserta."
      />

      <Separator />

      <div className="flex items-center space-x-2">
        <Button disabled>Filter</Button>
        <Button disabled>Sort</Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm"
          >
            <Skeleton className="aspect-[16/9] w-full" />
            <div className="flex flex-1 flex-col space-y-3 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="border-t p-4">
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="size-8" />
        ))}
      </div>
    </DashboardShell>
  )
}
