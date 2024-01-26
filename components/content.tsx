import React from "react"

import { Icons } from "@/components/icons"
import { Card } from "@/components/ui/card"

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

export function Content({ title, children, className, ...rest }: ContentProps) {
  return (
    <Card
      className={`flex h-fit w-full ${
        className ? className : "basis-3/4"
      } items-start justify-normal`}
      {...rest}
    >
      <div className="flex w-full flex-col gap-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">{title}</p>
          <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
        </div>

        <div className="h-full max-h-max  rounded-md border border-primary p-4">
          {children}
        </div>
      </div>
    </Card>
  )
}
