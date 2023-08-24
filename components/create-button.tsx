"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

/**
 * Interface for the KnowledgeCreateButton component.
 */
interface CreateButtonProps extends ButtonProps {}

export function CreateButton({
  className,
  variant,
  name,
  ...props
}: CreateButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <Button
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
      {name}
    </Button>
  )
}
