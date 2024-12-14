"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingContent() {
  return (
    <Card className="w-full rounded-none border-none sm:rounded-lg">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[85%]" />
      </CardContent>
    </Card>
  )
}
