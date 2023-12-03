import { Skeleton } from "@/components/ui/skeleton"





export default function KnowledgeContentFileNewPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-1 w-full" />

      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="grid w-full max-w-2xl gap-8">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  )
}
