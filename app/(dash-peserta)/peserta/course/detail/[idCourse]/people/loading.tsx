import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCoursePeoplePage() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="mb-2 h-6 w-[160px]" />
        <Skeleton className="h-4 w-[320px]" />
      </div>
      <Separator />
      <DataTableSkeleton columnCount={3} isNewRowCreatable={false} />
    </div>
  )
}
