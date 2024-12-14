"use client"

import React, { useState } from "react"
import confetti from "canvas-confetti"
import { useMediaQuery } from "react-responsive"
import { toast as sonnerToast } from "sonner"

import { BorderBeam } from "./border-beam"
import { Button } from "./ui/button"

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

// Define an array of messages
const messages = [
  "You clicked me!",
  "Hey, stop poking me!",
  "Clicked again? Curious!",
  "I see you're enjoying this.",
  "You're persistent, aren't you?",
  "Click, click, click!",
  "How many times will you click?",
  "You discovered the click feature!",
  "Keep going, see what happens.",
  "Are you not tired yet?",
  "Im gonna delete your windows folder, if you click me again",
]

// Function to get a random message
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}

export function Content({ title, children, className, ...rest }: ContentProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const handleClick = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (Date.now() > end) return

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })

      requestAnimationFrame(frame)
    }

    frame()

    sonnerToast.success(messages[currentMessageIndex], {
      duration: 3000,
      position: "bottom-center",
    })

    // Increment the message index or reset if at the end of the array
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length)
  }

  if (isMobile) {
    return (
      <div className="mx-auto h-full max-h-max w-full space-y-6 px-4 py-6">
        {children}
      </div>
    )
  } else {
    return (
      <div
        className={`relative flex h-fit w-full ${className ? className : "basis-3/4"} flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl`}
      >
        <div className="flex w-full flex-col gap-6 p-4 sm:w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="grow break-all font-heading text-2xl">{title}</p>
            <div className="relative">
              <Button
                onClick={handleClick}
                variant="outline"
                className="flex h-12 w-12 items-center justify-center rounded-full  text-xl text-white"
              >
                🎉
              </Button>
            </div>
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
