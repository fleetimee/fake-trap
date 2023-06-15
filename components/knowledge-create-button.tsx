"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface KnowledgeCreateButton extends ButtonProps {}

export function KnowledgeCreateButton({
  className,
  variant,
  ...props
}: KnowledgeCreateButton) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  function onClick() {}

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Pengetahuan
    </button>
  )
}
