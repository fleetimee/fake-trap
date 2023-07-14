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
import { Shell } from "@/components/shell/lobby-shell"
import { YoutubePlayer } from "@/components/youtube-player"

export default function IntroDetailKnowledge() {
  return (
    <Shell>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">nigga</p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>
            {/* <Image
              src={dataContentKnowledge.data.image}
              alt={dataContentKnowledge.data.knowledge_title}
              className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
              width={1280}
              height={720}
            /> */}
            <YoutubePlayer videoId="fqQ1Xum8uNI" />
            <Tabs
              defaultValue="description"
              className="relative mr-auto w-full"
            >
              <div className="flex items-center justify-between pb-3">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="description"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Deskripsi
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="description">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi</CardTitle>
                    <CardDescription>Lorem ipsum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{"asd"}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </Shell>
  )
}
