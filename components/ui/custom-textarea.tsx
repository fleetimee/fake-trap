import * as React from "react"

import { cn } from "@/lib/utils"

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3",
        "text-sm ring-offset-white placeholder:text-blue-400 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        "resize-none disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200 ease-in-out",
        "hover:border-blue-200 hover:bg-blue-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
CustomTextarea.displayName = "CustomTextarea"

export { CustomTextarea }
