"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

/**
 * Wraps the NextThemesProvider component from next-themes and passes its props to it.
 * @param children The child components to be wrapped by the ThemeProvider.
 * @param props The props to be passed to the NextThemesProvider component.
 * @returns The wrapped child components with the passed props.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
