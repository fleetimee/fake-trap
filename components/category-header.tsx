import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string | null
  size?: "default" | "sm"
  isWhiteText?: boolean
}

export function HeaderIntro({
  title,
  description,
  size = "default",
  className,
  isWhiteText = false,
  ...props
}: HeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <h1
        className={cn(
          "line-clamp-1 text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl",
          isWhiteText ? "text-white" : ""
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "line-clamp-2 text-muted-foreground",
            size === "default" && "text-lg",
            isWhiteText ? "text-white" : ""
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
