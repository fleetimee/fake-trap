import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * Defines the props for the NewKnowledgeCard component.
 */
interface NewKnowledgeProps {
  /** The name of the new knowledge. */
  knowledgeName: string
  /** The image of the new knowledge. */
  knowledgeImage: string
}

/**
 * Displays a card with information about a new knowledge.
 * @param knowledgeName - The name of the new knowledge.
 * @param knowledgeImage - The image of the new knowledge.
 * @returns A card component with the new knowledge information.
 */
export default function NewKnowledgeCard({
  knowledgeName,
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
          sizes="500px"
          width={500}
          height={500}
          className="rounded-md object-contain grayscale hover:grayscale-0"
        />
      </CardContent>
    </Card>
  )
}
