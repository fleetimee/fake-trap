import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateTime } from "luxon"
import { SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
  disabled?: boolean
}

export function DateTimePicker({
  date,
  setDate,
  disabled,
}: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
    DateTime.fromJSDate(date)
  )

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected)
    const modifiedDay = selectedDay.setZone("UTC").set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    })

    setSelectedDateTime(modifiedDay)
    setDate(modifiedDay.toJSDate())
  }

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    const hours = Number.parseInt(value.split(":")[0] || "00", 10)
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10)
    const modifiedDay = selectedDateTime
      .setZone("UTC")
      .set({ hour: hours, minute: minutes })

    setSelectedDateTime(modifiedDay)
    setDate(modifiedDay.toJSDate())
  }

  const footer = (
    <>
      <div className="px-4 pb-4 pt-0">
        <Label>Time</Label>
        <Input
          type="time"
          onChange={handleTimeChange}
          value={selectedDateTime.toFormat("HH:mm")}
        />
      </div>
      {!selectedDateTime && <p>Please pick a day.</p>}
    </>
  )

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10" disabled={disabled}>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? (
            selectedDateTime.toFormat("DDD HH:mm")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime.toJSDate()}
          onSelect={handleSelect}
          initialFocus
        />
        {footer}
      </PopoverContent>
    </Popover>
  )
}
