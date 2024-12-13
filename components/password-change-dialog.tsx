"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PasswordChangeDialog() {
  const [open, setOpen] = useState(true)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("passwordChangeDialogSeen")
    if (hasSeenDialog === "true") {
      setOpen(false)
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open && dontShowAgain) {
      localStorage.setItem("passwordChangeDialogSeen", "true")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <ShieldAlert className="size-6 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle className="text-center text-xl">
            Peringatan Keamanan
          </DialogTitle>
          <DialogDescription className="text-center">
            Untuk keamanan akun Anda, kami sangat menyarankan untuk segera
            mengganti password default Anda.
            <p className="mt-2 text-xs italic text-muted-foreground">
              *Abaikan pesan ini jika Anda sudah mengganti password default
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dontShow"
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
          />
          <label
            htmlFor="dontShow"
            className="text-sm leading-none text-muted-foreground"
          >
            Jangan tampilkan pesan ini lagi
          </label>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-600"
          >
            <Link href="/peserta/setting/security" className="gap-2">
              <ShieldAlert className="size-4" />
              Ganti Password Sekarang
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
