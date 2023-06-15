import { MainNavItem } from "@/types"

import { useLockBody } from "@/hooks/use-lock-body"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody()
}
