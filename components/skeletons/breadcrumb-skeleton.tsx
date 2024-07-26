import React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function BreadcrumbSkeleton() {
  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "flex items-center overflow-x-auto whitespace-nowrap p-2 text-sm font-medium md:p-0"
      )}
    >
      {[...Array(3)].map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton
            className={cn(
              "h-6 w-20 truncate transition-colors hover:text-muted-foreground",
              index === 2 ? "font-bold" : undefined
            )}
          />
          {index !== 2 && (
            <Skeleton className="mx-2 size-4 h-4 w-4" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
