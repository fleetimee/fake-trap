"use client"

// this comes from the framer-motion docs, just ported to twcss
import React from "react"





interface TypingEffectProps {
  textTyping: string
}

export function TypingEffect({ textTyping }: TypingEffectProps) {
  const text = textTyping
  const [displayedText, setDisplayedText] = React.useState("")
  const [i, setI] = React.useState(0)

  React.useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i))
        setI(i + 1)
      } else {
        clearInterval(typingEffect)
      }
    }, 200)

    return () => {
      clearInterval(typingEffect)
    }
  }, [i, text])

  return (
    <h1 className="font-display  font-heading text-xl  tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]">
      {displayedText ? displayedText : "Typing Effect"}
    </h1>
  )
}
