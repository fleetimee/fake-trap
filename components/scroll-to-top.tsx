"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "./ui/button"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
    }
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility)

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
  }

  // handles the animation when scrolling to the bottom
  const scrollToBottom = () => {
    !isVisible &&
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      })
  }

  return (
    <>
      {isVisible ? (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2 opacity-100 outline-none transition-opacity duration-200"
          onClick={scrollToTop}
        >
          <ChevronUp />
        </Button>
      ) : (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2 opacity-100 outline-none transition-opacity duration-200"
          onClick={scrollToBottom}
        >
          <ChevronDown />
        </Button>
      )}
    </>
  )
}
