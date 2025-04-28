"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "next-themes"

interface SimpleDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  error?: boolean
  className?: string
}

export function SimpleDatePicker({ date, setDate, error, className }: SimpleDatePickerProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${error ? "border-red-500" : ""} ${className} ${
            isDark ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <SimpleCalendar 
          selectedDate={date} 
          onDateSelect={(date) => setDate(date)} 
        />
      </PopoverContent>
    </Popover>
  )
} 