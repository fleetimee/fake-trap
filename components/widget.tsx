import { cn } from "@/lib/utils"

import { BorderBeam } from "./border-beam"
import ShineBorder from "./shine-border"

interface CardProps {
  variant?: string
  extra?: string
  children?: JSX.Element | any[]
  [x: string]: any
}

function Card({ variant, extra, children, ...rest }: CardProps) {
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-lg border border-card bg-white bg-clip-border shadow-sm ${
        rest.default
          ? "shadow-shadow-500 dark:shadow-none"
          : "shadow-shadow-100 dark:shadow-none"
      }  dark:!bg-navy-800 dark:text-white  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  )
}

interface WidgetProps {
  icon: JSX.Element
  title: string
  subtitle: string
  className?: string
}

export function Widget({ icon, title, subtitle, className }: WidgetProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-100/50 dark:from-gray-900 dark:to-gray-800/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:to-gray-400">
            {subtitle}
          </h4>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-3 shadow-inner">
          <span className="size-6">{icon}</span>
        </div>
      </div>
    </div>
  )
}
