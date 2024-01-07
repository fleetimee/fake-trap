"use client"

import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { KnowledgeStatusCountData } from "@/types/knowledge/res"

interface KnowledgeStatusCountProps {
  data: KnowledgeStatusCountData[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function KnowledgeStatusCount({ data }: KnowledgeStatusCountProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status_text" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>{" "}
      </BarChart>
    </ResponsiveContainer>
  )
}

// const ExampleBarChart = () => {
//   return (
//     <BarChart width={600} height={400} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="status_text" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="count" fill="#8884d8" />
//     </BarChart>
//   )
// }

// export default ExampleBarChart
