import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryPageLoading() {
  return (
    <section className="flex flex-col gap-6 space-y-6">
      {/* Filter and Sort buttons */}
      <div className="flex items-center space-x-2">
        <Button size="sm" disabled>
          Filter
        </Button>
        <Button size="sm" disabled>
          Sort
        </Button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="size-8 rounded" />
        ))}
      </div>
    </section>
  )
}

function CategoryCardSkeleton() {
  return (
    <Card className="flex w-full flex-col overflow-hidden">
      <div className="aspect-[16/9] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="border-t p-2.5 sm:p-4">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </Card>
  )
}
