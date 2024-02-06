import { cn } from "@/lib/utils"

/**
 * Interface for the props of the DashboardShell component.
 */
interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * DashboardShell component that renders a grid with a gap of 8 between items.
 * @param children - The child components to render inside the grid.
 * @param className - The CSS class name to apply to the grid.
 * @param props - Additional HTML attributes to apply to the grid.
 * @returns The rendered DashboardShell component.
 */
export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-4 md:grid md:items-start md:gap-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
