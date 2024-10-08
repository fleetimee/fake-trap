import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CategoryCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={21 / 9}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
        <Skeleton className="absolute right-2 top-2 h-6 w-14 rounded-sm px-2 py-1" />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
  )
}

export function CategoryCardSkeletonSecond() {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <Skeleton className="mb-4 h-32 w-full rounded" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
