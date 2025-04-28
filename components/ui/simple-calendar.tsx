"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface SimpleCalendarProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date) => void
  className?: string
}

export function SimpleCalendar({ selectedDate, onDateSelect, className }: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })
  
  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  const isDateDisabled = (date: Date) => date < today
  
  return (
    <div className={cn("p-4 rounded-lg", isDark ? "bg-gray-800" : "bg-white", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePreviousMonth}
          className={isDark ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-md font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleNextMonth}
          className={isDark ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className={cn("text-center text-sm font-medium py-1", isDark ? "text-gray-400" : "text-gray-500")}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map(day => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const disabled = isDateDisabled(day)
          
          return (
            <Button
              key={day.toString()}
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => !disabled && onDateSelect(day)}
              className={cn(
                "h-9 w-full rounded-md",
                isSelected ? "bg-[#4a9cd6] text-white hover:bg-[#3a8cc6]" : "",
                isToday(day) && !isSelected ? (isDark ? "bg-gray-700" : "bg-gray-100") : "",
                !isSameMonth(day, currentMonth) ? "opacity-50" : "",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                isDark && !isSelected ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"
              )}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>
    </div>
  )
} 