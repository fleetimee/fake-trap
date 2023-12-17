import { Skeleton } from "@/components/ui/skeleton"

export default function CourseContentVideoNewPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-1 w-full" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
