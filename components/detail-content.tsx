import Image from "next/image"

import { KnowledgeByIdResponse } from "@/types/knowledge-res"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

/**
 * Props for the DetailContent component.
 * @interface DetailContentProps
 * @property {string} title - The title of the detail content.
 */
interface DetailContentProps {
  title: string
}
/**
 * Renders a detail content component with a title and a video.
 * @param {DetailContentProps} props - The props object containing the title.
 * @returns {JSX.Element} - A JSX.Element representing the detail content component.
 */
export function DetailContent(dataContentKnowledge: KnowledgeByIdResponse) {
  console.log(dataContentKnowledge)

  return (
    <Card className="flex basis-3/4 items-start justify-normal">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">
            {dataContentKnowledge.data.knowledge_title}
          </p>
          <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
        </div>
        <Image
          src={dataContentKnowledge.data.image}
          alt={dataContentKnowledge.data.knowledge_title}
          className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
          width={1280}
          height={720}
        />
        <Tabs defaultValue="description" className="hidden md:block">
          <TabsList className="flex w-1/2">
            <TabsTrigger value="description" className="w-full">
              Deskripsi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle>Deskripsi</CardTitle>
                <CardDescription>Lorem ipsum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-[300px] w-full">
                  <p>{dataContentKnowledge.data.description}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
