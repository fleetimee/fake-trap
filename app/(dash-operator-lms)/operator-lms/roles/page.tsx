import { JSX, SVGProps } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Managemen Kewenangan",
  description: "Managemen Kewenangan",
}

export default async function OperatorLMSRolePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return null
}

// export function Component() {
//   return (
//     <Card className="m-4 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
//       <CardHeader className="md:flex">
//         <div className="md:shrink-0">
//           <img
//             alt="A role management logo"
//             className="h-48 w-full object-cover md:w-48"
//             height="48"
//             src="/images/placeholder.svg"
//             style={{
//               aspectRatio: "48/48",
//               objectFit: "cover",
//             }}
//             width="48"
//           />
//         </div>
//         <div className="p-8">
//           <CardTitle className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
//             Role Management
//           </CardTitle>
//           <CardDescription className="mt-1 block text-lg font-medium leading-tight text-black">
//             Role Management Page
//           </CardDescription>
//           <CardContent className="mt-2 text-gray-500">
//             Disini kamu dapat mengatur kewenangan dari user yang ada di
//             platform.
//           </CardContent>
//         </div>
//       </CardHeader>
//       <CardFooter className="flex items-center justify-between p-2 leading-none md:p-4">
//         <Button className="mt-4 inline-flex items-center rounded border-0 bg-blue-500 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none md:mt-0">
//           Get Started
//         </Button>
//         <Link href="#">
//           <Badge
//             className="text-blue-600 visited:text-purple-600 hover:bg-gray-100/50 hover:text-blue-800 dark:hover:bg-gray-800/50"
//             variant="secondary"
//           >
//             Learn More
//           </Badge>
//         </Link>
//       </CardFooter>
//     </Card>
//   )
// }

function IconCookie(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  )
}
