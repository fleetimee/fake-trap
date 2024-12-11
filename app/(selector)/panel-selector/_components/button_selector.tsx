import Link from "next/link"

import { cn } from "@/lib/utils"
import { LottieClient } from "@/components/lottie-anim"
import { Button } from "@/components/ui/button"

interface ButtonSelectorProps {
  title: string
  description: string
  link: string
  animationData: any
  isTextMuted?: boolean
  disabled?: boolean
}

export function ButtonSelector({ ...props }: ButtonSelectorProps) {
  return (
    <div
      className={cn(
        "group relative isolate h-[320px] overflow-hidden rounded-xl border bg-white/50 p-2 backdrop-blur-sm transition-all duration-300 dark:bg-slate-900/50",
        {
          "cursor-not-allowed opacity-60": props.disabled,
          "hover:scale-[1.02] hover:border-primary/40 hover:shadow-lg":
            !props.disabled,
        }
      )}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 dark:from-blue-900/20 dark:to-indigo-900/20" />

      {/* New decorative gradient overlay */}
      <div className="absolute -right-12 -top-12 -z-10 h-48 w-48 rotate-12 bg-gradient-to-br from-blue-100/40 via-blue-50/30 to-transparent blur-2xl dark:from-blue-900/30 dark:via-blue-800/20" />
      <div className="absolute bottom-0 left-0 -z-10 h-32 w-full bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50" />

      <div className="flex h-full flex-col justify-between rounded-lg p-6">
        <div className="flex justify-center">
          <div className="relative size-20 transition-transform duration-300 ease-in-out group-hover:scale-110">
            <LottieClient
              animationData={props.animationData}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <h3 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent transition-colors dark:from-white dark:to-gray-300 sm:text-xl">
            {props.title}
          </h3>
          <p
            className={cn(
              "mx-auto max-h-[4.5rem] max-w-[90%] overflow-hidden text-center text-xs leading-relaxed transition-colors sm:text-sm",
              {
                "text-muted-foreground": props.isTextMuted,
                "text-gray-600 dark:text-gray-300": !props.isTextMuted,
              }
            )}
          >
            {props.description}
          </p>
        </div>

        <Link
          href={props.link}
          className="w-full"
          style={{
            pointerEvents: props.disabled ? "none" : "auto",
          }}
        >
          <Button
            size="default"
            className={cn(
              "w-full border-0 bg-gradient-to-r from-blue-400/80 via-blue-500/80 to-blue-600/80 text-white shadow-md transition-all duration-300 dark:from-blue-600 dark:via-blue-500 dark:to-blue-400",
              !props.disabled && [
                "hover:shadow-xl",
                "hover:from-blue-500/90 hover:via-blue-600/90 hover:to-blue-700/90",
                "dark:hover:from-blue-500 dark:hover:via-blue-400 dark:hover:to-blue-300",
                "hover:scale-[1.02]",
                "active:scale-[0.98]",
              ],
              props.disabled && "opacity-50"
            )}
            disabled={props.disabled}
          >
            <span className="font-medium">Masuk</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
