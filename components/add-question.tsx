"use client"

import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function QuestionForm() {
  const fieldArrayName = "questions"

  return (
    <Card className="flex flex-col gap-8 p-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-heading font-semibold">Test Layouting</h1>

        <Button>Tambah Pertanyaan</Button>
      </div>

      <p>This should be on bottom</p>
    </Card>
  )
}