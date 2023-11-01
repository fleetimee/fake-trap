"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="grid items-center justify-center text-4xl lg:text-7xl">
            <Icons.warning className="h-24 w-24 text-red-500" />
          </CardTitle>
          <CardDescription>
            Halaman yang anda cari tidak ditemukan
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button
            variant="default"
            onClick={() => {
              router.back()
            }}
          >
            Kembali
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
