"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DetailEmptyContent extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyContent({
  className,
  children,
  ...props
}: DetailEmptyContent) {
  return (
    <div
      className={cn(
        "flex h-auto min-h-[350px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

interface DetailEmptyContentIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

EmptyContent.Icon = function DetailEmptyContentIcon({
  name,
  className,
  ...props
}: DetailEmptyContentIconProps) {
  const LucideIcon = Icons[name]

  if (!LucideIcon) {
    return null
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      {/* <LucideIcon className={cn("h-10 w-10", className)} {...props} /> */}
      {/* <Icon className={cn("h-10 w-10", className)} {...props} /> */}

      <LucideIcon />
    </div>
  )
}

interface DetailEmptyContentTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyContent.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: DetailEmptyContentTitleProps) {
  return (
    <h2 className={cn("mt-6 text-lg font-semibold", className)} {...props} />
  )
}

interface DetailEmptyContentDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyContent.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: DetailEmptyContentDescriptionProps) {
  return (
    <p
      className={cn(
        "mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
