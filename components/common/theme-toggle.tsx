"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // After mounting, we can safely show the toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid rendering anything until mounting is complete
  if (!mounted) {
    return <div className="w-9 h-9"></div> // Placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      className={`relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[#4a9cd620]" : "bg-[#4a9cd610]"
      } hover:scale-105 active:scale-95 transition-transform`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <div className="absolute">
        {isDark ? <Moon className="h-5 w-5 text-[#4a9cd6]" /> : <Sun className="h-5 w-5 text-[#4a9cd6]" />}
      </div>
    </button>
  )
}
