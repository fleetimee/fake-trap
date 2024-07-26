import { Skeleton } from "@/components/ui/skeleton"

const DashboardHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <Skeleton className="h-8 w-48 md:h-10 md:w-56" />
        <Skeleton className="h-6 w-64 md:w-72" />
      </div>
      <Skeleton className="h-8 w-8 md:h-10 md:w-10" />
    </div>
  )
}

export default DashboardHeaderSkeleton
