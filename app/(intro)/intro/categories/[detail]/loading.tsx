import { Shell } from "@/components/shell/lobby-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryAllLoading() {
  return (
    <Shell className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat lg:bg-bottom">
      {/* Breadcrumb loading */}
      <div className="mb-6">
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Image container loading */}
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
          </div>

          {/* Title loading */}
          <Skeleton className="h-7 w-64" />

          {/* Grid loading */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[280px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}
