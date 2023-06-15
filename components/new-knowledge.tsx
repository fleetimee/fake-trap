import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NewKnowledgeProps {
  knowledgeName: string
  knowledgeDescription: string
  knowledgeImage: string
}

/**
 * Displays a card with information about a new knowledge.
 * @param knowledgeName - The name of the new knowledge.
 * @param knowledgeDescription - The description of the new knowledge.
 * @param knowledgeImage - The image of the new knowledge.
 * @returns A card component with the new knowledge information.
 */
export default function NewKnowledgeCard({
  knowledgeName,
  knowledgeDescription,
  knowledgeImage,
}: NewKnowledgeProps) {
  return (
    <Card className="space-y-2">
      <CardHeader className="text-2xl">
        <CardTitle className="text-base">Pengetahuan Terbaru</CardTitle>
        <CardDescription className="text-2xl">{knowledgeName}</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <Image
          src={knowledgeImage}
          alt={`Pic ${knowledgeName}`}
          width={500}
          height={500}
          className="rounded-md grayscale hover:grayscale-0"
        />
      </CardContent>
    </Card>
  )
}
