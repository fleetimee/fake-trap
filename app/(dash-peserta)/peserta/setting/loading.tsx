import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="mt-2 h-4 w-[320px]" />
      </div>
      <Separator />
      <div className="space-y-8">
        <div className="grid gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <div className="grid gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        <div className="grid gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <div className="grid gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  )
}
