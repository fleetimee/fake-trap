import Image from "next/image"
import Link from "next/link"

import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps {
  title: string
  name: string
  image: string
  url?: string
  buttonText?: string
  icon?: keyof typeof Icons
  disableButton?: boolean
}

export function CardDashboard({
  title,
  name,
  image,
  url,
  buttonText,
  icon,
  disableButton,
}: CardProps) {
  const Icon = Icons[icon || "arrowRight"]

  return (
    <Card className="h-fit space-y-2 rounded-none shadow-md hover:bg-accent hover:text-accent-foreground md:rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="text-2xl font-bold">{name}</div>
        </div>
        <div>
          <CardTitle className="text-base">
            <Icon className="size-4 text-muted-foreground" />
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Link href={url || "#"}>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt={`Pic ${name}`}
              width={500}
              height={500}
              className="aspect-video flex-none rounded-md object-cover transition-all duration-500 ease-in-out hover:scale-105"
            />
          </MotionDiv>
        </Link>
      </CardContent>
      <CardFooter className="text-center">
        {/*<Link href={url || "#"} className="w-full">*/}
        {/*  <Button className="w-full">{buttonText || "Wtf is this?"}</Button>*/}
        {/*</Link>*/}

        <Link
          href={url || "#"}
          className={buttonVariants({
            variant: "default",
            className: "w-full",
          })}
        >
          {/*{disableButton ? (*/}
          {/*  <Button className="w-full" disabled>*/}
          {/*    {buttonText || "Wtf is this?"}*/}
          {/*  </Button>*/}
          {/*) : (*/}
          {/*  <Button className="w-full">{buttonText || "Wtf is this?"}</Button>*/}
          {/*)}*/}

          {buttonText ? buttonText : "Wtf is this?"}
        </Link>
      </CardFooter>
    </Card>
  )
}
