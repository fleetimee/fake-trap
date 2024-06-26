import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardDashboardIndicatorProps {
  title: string
  icon: keyof typeof Icons
  content: number
  description: string
}

export function CardDashboardIndicator({
  title,
  icon,
  content,
  description,
}: CardDashboardIndicatorProps) {
  const Icon = Icons[icon || "arrowRight"]

  return (
    <Card className="hover:bg-accent hover:text-accent-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
