/**
 * The props object for the DashboardHeader component.
 * @interface DashboardHeaderProps
 * @property {string} heading - The heading for the dashboard header.
 * @property {string} [description] - An optional description for the dashboard header.
 * @property {React.ReactNode} [children] - The children to be rendered inside the dashboard header.
 */
interface DashboardHeaderProps {
  heading: string
  description?: string
  children?: React.ReactNode
}
/**
 * Renders a header for the dashboard with a heading, optional description and children.
 * @param {DashboardHeaderProps} props - The props object containing the heading, description and children.
 * @returns {JSX.Element} - The JSX element representing the dashboard header.
 */
export function DashboardHeader({
  heading,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
