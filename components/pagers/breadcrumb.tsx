"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface BreadcrumbsProps {
  segments: {
    title: string
    href: string
  }[]
  separator?: keyof typeof Icons
  isWhiteText?: boolean
}

export function BreadCrumbs({
  segments,
  separator,
  isWhiteText = false,
}: BreadcrumbsProps) {
  const SeparatorIcon = Icons[separator ?? "chevronRight"]

  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(
        "flex items-center overflow-x-auto whitespace-nowrap text-sm font-medium",
        isWhiteText ? "text-white" : "text-foreground"
      )}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? "page" : undefined}
              href={segment.href}
              className={cn(
                "truncate transition-colors hover:text-muted-foreground",
                isLastSegment ? "font-bold" : undefined,
                isWhiteText ? "text-white" : "text-foreground"
              )}
            >
              {segment.title}
            </Link>
            {!isLastSegment && (
              <SeparatorIcon className="mx-2 h-4 w-4" aria-hidden="true" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
