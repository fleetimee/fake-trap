import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

export default function DetailKnowledge({
  params,
}: {
  params: { detail: string }
}) {
  return (
    <DashboardShell>
      <div className="flex h-auto flex-col gap-4 px-2 md:flex-row">
        <Card className="flex basis-3/4 items-start justify-normal">
          <div className="flex flex-col gap-8 p-4">
            <div className="flex flex-row items-center justify-between">
              <h2 className="grow break-all">{params.detail}</h2>
              <Icons.billing className="h-14 w-14 flex-none  pl-5" />
            </div>
            <Image
              src="https://pbs.twimg.com/media/FyzcwvqaYAEqDjq?format=jpg&name=small"
              alt="nigger"
              className="aspect-video rounded-lg object-cover sepia hover:sepia-0"
              width={1280}
              height={720}
            />
            <Tabs defaultValue="description" className="hidden md:block">
              <TabsList className="grid w-1/2 grid-cols-2">
                <TabsTrigger value="description">Deskripsi</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi</CardTitle>
                    <CardDescription>Lorem ipsum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Fermentum posuere urna nec tincidunt
                        praesent semper. Eu volutpat odio facilisis mauris sit.
                        Eget lorem dolor sed viverra. Diam maecenas ultricies mi
                        eget mauris pharetra et. Fermentum iaculis eu non diam.
                        Nibh sed pulvinar proin gravida hendrerit lectus. Vitae
                        congue eu consequat ac felis donec et odio pellentesque.
                        Nisl vel pretium lectus quam id leo in vitae. Faucibus
                        interdum posuere lorem ipsum dolor sit. Quis imperdiet
                        massa tincidunt nunc pulvinar sapien et ligula
                        ullamcorper. Eget Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Fermentum
                        posuere urna nec tincidunt praesent semper. Eu volutpat
                        odio facilisis mauris sit. Eget lorem dolor sed viverra.
                        Diam maecenas ultricies mi eget mauris pharetra et.
                        Fermentum iaculis eu non diam. Nibh sed pulvinar proin
                        gravida hendrerit lectus. Vitae congue eu consequat ac
                        felis donec et odio pellentesque. Nisl vel pretium
                        lectus quam id leo in vitae. Faucibus interdum posuere
                        lorem ipsum dolor sit. Quis imperdiet massa tincidunt
                        nunc pulvinar sapien et ligula ullamcorper. Eget
                      </p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, youll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
        <Card className="sticky flex h-[750px] basis-1/4 flex-col items-center justify-start">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Accordion type="single" collapsible className="px-4">
                <ScrollArea className="h-[650px]  w-full">
                  {Array.from({ length: 20 }, (_, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="text-sm"
                    >
                      <AccordionTrigger className="text-sm">
                        Pengetahuan {index + 1}
                      </AccordionTrigger>
                      <AccordionContent className="py-4">
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </ScrollArea>
              </Accordion>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardShell>
  )
}
