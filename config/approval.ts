import { ApprovalStatus } from "@/lib/enums/status"

export const approvalOptions = [
  {
    label: "Date: Old to new",
    value: "created_at.asc",
  },
  {
    label: "Date: New to old",
    value: "created_at.desc",
  },
  {
    label: "Alphabetical: A to Z",
    value: "course_name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "course_name.desc",
  },
]

export const approvalStatusOptions = [
  { label: "Pending", value: "0051" },
  { label: "Approved", value: "0052" },
  { label: "Rejected", value: "0053" },
]
