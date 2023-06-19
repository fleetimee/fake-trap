"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

/**
 * Interface for the KnowledgeCreateButton component.
 */
interface KnowledgeCreateButtonProps extends ButtonProps {}

/**
 * Renders a button for creating knowledge.
 * @param className - The class name for the button.
 * @param variant - The variant of the button.
 * @param props - The props for the button.
 * @returns A React button component.
 */
export function KnowledgeCreateButton({
  className,
  variant,
  name,
  ...props
}: KnowledgeCreateButtonProps) {
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
      {name}
    </button>
  )
}
