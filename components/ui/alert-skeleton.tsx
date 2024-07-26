import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        informative:
          "border-informative/50 text-informative dark:border-informative [&>svg]:text-informative",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const AlertSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    <Skeleton className="absolute left-4 top-4 h-6 w-6 rounded-full" />
    <div className="pl-11">
      <Skeleton className="mb-1 h-4 w-1/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
))
AlertSkeleton.displayName = "AlertSkeleton"

const AlertTitleSkeleton = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    <Skeleton className="h-4 w-1/3" />
  </h5>
))
AlertTitleSkeleton.displayName = "AlertTitleSkeleton"

const AlertDescriptionSkeleton = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  >
    <Skeleton className="h-4 w-full" />
  </div>
))
AlertDescriptionSkeleton.displayName = "AlertDescriptionSkeleton"

export { AlertSkeleton, AlertTitleSkeleton, AlertDescriptionSkeleton }
