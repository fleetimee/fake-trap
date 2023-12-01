import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { AddSectionForm } from "@/components/forms/add-knowledge-section"
import { Separator } from "@/components/ui/separator"
