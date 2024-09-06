import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardShellSkeleton() {
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <span>/</span>
          <Skeleton className="h-4 w-24" />
          <span>/</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Alert Section */}
      <div className="mt-4 md:px-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-40" />
      </div>

      {/* Section Banner & Countdown Timer */}
      <div className="relative mt-4 hidden sm:block">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="absolute right-4 top-4 rounded-lg bg-gray-200 px-2 py-1">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex items-center justify-end">
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>

      {/* Course Alert */}
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Content and Sidebar */}
      <div className="mt-4 flex h-auto flex-col gap-4 md:px-2 lg:flex-row">
        <div className="flex-1">
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="h-40 w-full" />
        </div>

        <div className="hidden lg:block">
          <Skeleton className="h-40 w-64" />
        </div>
      </div>
    </div>
  )
}
