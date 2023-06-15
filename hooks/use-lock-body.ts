import React from "react"

/**
 * Prevents scrolling of the body element by setting its overflow to hidden.
 * This is useful when displaying a modal or a dialog box.
 * Returns a function that restores the original overflow style of the body element.
 */
export function useLockBody() {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
