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
      className={cn({
        "relative overflow-hidden rounded-lg border bg-background p-2":
          props.disabled,
        "relative overflow-hidden rounded-lg border bg-background p-2 hover:border-primary":
          !props.disabled,
      })}
    >
      <div className="flex min-h-[180px] flex-col justify-between space-y-6 rounded-md p-6">
        <div className="flex justify-center">
          <div className="h-20 w-20">
            <LottieClient
              animationData={props.animationData}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">{props.title}</h3>
          <p
            className={cn({
              "text-sm text-muted-foreground": props.isTextMuted,
              "text-sm": !props.isTextMuted,
            })}
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
          <Button size="default" className="w-full" disabled={props.disabled}>
            Masuk
          </Button>
        </Link>
      </div>
    </div>
  )
}
