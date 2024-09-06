import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardShellSkeleton() {
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <span>/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Dashboard Header */}
      <div className="mt-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <Separator className="my-4" />

      {/* Children Skeleton */}
      <section className="flex flex-col gap-6 space-y-6">
        {/* Filter and Sort buttons */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Category Cards */}
        <div className="xs:grid-cols-2 grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination Button */}
        <div className="mt-4">
          <Skeleton className="h-10 w-40 rounded" />
        </div>
      </section>
    </div>
  )
}

function CategoryCardSkeleton() {
  return (
    <div className="cursor-pointer">
      <AspectRatio ratio={21 / 9}>
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}
