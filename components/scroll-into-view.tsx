"use client"

import React from "react"
import ScrollIntoView from "react-scroll-into-view"

interface ScrollIntoViewButtonProps {
  selector: string
  children: React.ReactNode
}

export const ScrollIntoViewButton: React.FC<ScrollIntoViewButtonProps> = ({
  selector,
  children,
}) => {
  return <ScrollIntoView selector={selector}>{children}</ScrollIntoView>
}
