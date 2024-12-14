import { Skeleton } from "@/components/ui/skeleton"

export default function CourseDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* Breadcrumbs skeleton */}
      <div className="hidden items-center space-x-2 sm:flex">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Alert skeletons */}
      <div className="space-y-4">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>

      {/* Banner skeleton */}
      <div className="relative hidden sm:block">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="absolute right-4 top-4">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      {/* Course alert skeleton */}
      <Skeleton className="h-16 w-full rounded-lg" />

      {/* Main content and sidebar layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main content area */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4 rounded-lg border p-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden w-[300px] shrink-0 lg:block">
          <div className="space-y-4 rounded-lg border p-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
