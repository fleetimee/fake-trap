import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface PesertaNotePageSkeletonProps {
  params: {
    idCourse: string
  }
}

export default function PesertaNotePageSkeleton({
  params,
}: PesertaNotePageSkeletonProps) {
  const isNoteEmpty = true // You can simulate skeleton state as needed

  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <Separator />

      {isNoteEmpty ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <Skeleton className="mx-auto h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="mx-auto h-8 w-48" />
                  <Skeleton className="mx-auto h-4 w-64" />
                </div>
                <Skeleton className="mx-auto h-10 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="mt-4 flex justify-end space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex w-full justify-center">
              <div className="cst-wrap-text whatever-you-want">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-2 h-4 w-4/6" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
