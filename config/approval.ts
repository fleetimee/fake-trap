import { ApprovalStatus } from "@/lib/enums/status"

export const approvalOptions = [
  {
    label: "Item count: Low to high",
    value: "productCount.asc",
  },
  {
    label: "Item count: High to low",
    value: "productCount.desc",
  },
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
]

export const approvalStatusOptions = [
  { label: "Pending", value: "0051" },
  { label: "Approved", value: "0052" },
  { label: "Rejected", value: "0053" },
]
