import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { ClientButton } from "@/components/client-button"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: keyof typeof Icons
  title: string
  description: string
  retryLink?: string
  retryLinkText?: string
  reset?: () => void
}

export function ErrorCard({
  icon,
  title,
  description,
  retryLink,
  retryLinkText = "Go back",
  reset,
  className,
  ...props
}: ErrorCardProps) {
  const Icon = Icons[icon ?? "warning"]

  return (
    <Card
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "grid w-full place-items-center border-blue-200/50 bg-gradient-to-b from-white to-blue-50/50",
        className
      )}
      {...props}
    >
      <CardHeader>
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-white shadow-inner">
          <Icon className="h-10 w-10 text-blue-600" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[176px] flex-col items-center justify-center space-y-4 text-center">
        <CardTitle className="text-2xl font-bold text-blue-900">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-4 text-blue-600">
          {description}
        </CardDescription>
      </CardContent>
      {retryLink ? (
        <CardFooter>
          <Link
            href={retryLink}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
              })
            )}
          >
            {retryLinkText}
            <span className="sr-only">{retryLinkText}</span>
          </Link>
        </CardFooter>
      ) : null}
      {reset ? (
        <CardFooter>
          <ClientButton
            aria-label="Retry"
            variant="ghost"
            onClick={reset}
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            Retry
          </ClientButton>
        </CardFooter>
      ) : null}
    </Card>
  )
}
