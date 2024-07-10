"use client"

import React from "react"
import { useMediaQuery } from "react-responsive"

import { Icons } from "@/components/icons"
import { Card } from "@/components/ui/card"

import { BorderBeam } from "./border-beam"

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

export function Content({ title, children, className, ...rest }: ContentProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

  if (isMobile) {
    return <div className="h-full max-h-max  sm:w-screen">{children}</div>
  } else {
    return (
      <div
        className={`relative flex h-fit w-full ${className ? className : "basis-3/4"} flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl`}
      >
        <div className="flex w-full flex-col gap-6 p-4 sm:w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="grow break-all font-heading text-2xl">{title}</p>
            <Icons.bookmark className="size-14 flex-none pl-5" />
          </div>

          <div className="h-full max-h-max rounded-md border border-primary p-4 sm:w-full">
            {children}
          </div>
        </div>

        {/* Place the BorderBeam component here, as per your requirement */}
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    )
  }

  // return (
  //   <Card
  //     className={`flex h-fit w-full ${
  //       className ? className : "basis-3/4"
  //     } items-start justify-normal sm:w-full`}
  //     {...rest}
  //   >
  //     <div className="flex w-full flex-col gap-6 p-4 sm:w-full">
  //       <div className="flex flex-row items-center justify-between">
  //         <p className="grow break-all font-heading text-3xl">{title}</p>
  //         <Icons.bookmark className="size-14 flex-none pl-5" />
  //       </div>

  //       <div className="h-full max-h-max rounded-md border border-primary p-4 sm:w-full">
  //         {children}
  //       </div>
  //     </div>
  //   </Card>
  // )
}
