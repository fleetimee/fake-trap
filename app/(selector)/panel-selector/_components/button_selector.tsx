import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"





interface ButtonSelectorProps {
  title: string
  description: string
  link: string
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
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
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
