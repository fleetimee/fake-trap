import { Badge } from "@/components/ui/badge"

interface BadgeSwitchProps {
  approval: {
    status_code: string
    status_text: string
  }
}

export function badgeSwitch({ approval }: BadgeSwitchProps) {
  switch (approval.status_code) {
    case "0052":
      return <Badge className="bg-green-400">{approval.status_text}</Badge>
    case "0051":
      return <Badge className="bg-yellow-400">{approval.status_text}</Badge>
    case "0053":
      return <Badge className="bg-red-400">{approval.status_text}</Badge>
    default:
      return <Badge className="bg-orange-400">Draft</Badge>
  }
}
