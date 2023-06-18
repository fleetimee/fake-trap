import Image from "next/image"

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
export function DetailContent({ title }: DetailContentProps): JSX.Element {
  return (
    <Card className="flex basis-3/4 items-start justify-normal">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">{title}</p>
          <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
        </div>
        <Image
          src="https://pbs.twimg.com/media/FyzcwvqaYAEqDjq?format=jpg&name=small"
          alt="nigger"
          className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Fermentum posuere urna nec tincidunt praesent
                    semper. Eu volutpat odio facilisis mauris sit. Eget lorem
                    dolor sed viverra. Diam maecenas ultricies mi eget mauris
                    pharetra et. Fermentum iaculis eu non diam. Nibh sed
                    pulvinar proin gravida hendrerit lectus. Vitae congue eu
                    consequat ac felis donec et odio pellentesque. Nisl vel
                    pretium lectus quam id leo in vitae. Faucibus interdum
                    posuere lorem ipsum dolor sit. Quis imperdiet massa
                    tincidunt nunc pulvinar sapien et ligula ullamcorper. Eget
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Fermentum posuere urna nec tincidunt praesent
                    semper. Eu volutpat odio facilisis mauris sit. Eget lorem
                    dolor sed viverra. Diam maecenas ultricies mi eget mauris
                    pharetra et. Fermentum iaculis eu non diam. Nibh sed
                    pulvinar proin gravida hendrerit lectus. Vitae congue eu
                    consequat ac felis donec et odio pellentesque. Nisl vel
                    pretium lectus quam id leo in vitae. Faucibus interdum
                    posuere lorem ipsum dolor sit. Quis imperdiet massa
                    tincidunt nunc pulvinar sapien et ligula ullamcorper. Eget
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
                  Change your password here. After saving, youll be logged out.
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
  )
}
