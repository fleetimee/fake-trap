import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-base animate-pulse bg-white", className)}
      {...props}
    />
  )
}

export { Skeleton }
