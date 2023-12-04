import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { addThreadSchema } from "@/lib/validations/thread"
import { AddCategoryForm } from "@/components/forms/add-category-form"
import { AddThreadForm } from "@/components/forms/add-thread-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface AddThreadsPageNewProps {
  params: {
    idCourse: string
  }
}

export default function AddThreadsPageNew({ params }: AddThreadsPageNewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Buat Thread Baru</h3>
        <p className="text-sm text-muted-foreground">
          Buat Diskusi Thread baru untuk pelatihan ini.
        </p>
      </div>
      <Separator />
      <AddThreadForm idCourse={Number(params.idCourse)} />
    </div>
  )
}
