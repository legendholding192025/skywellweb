"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem("cookie-consent")
    if (!consentStatus) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className={`mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 ${
          isDark ? "bg-gray-900" : "bg-white"
        } shadow-lg border-t ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies.
              {" "}
              <a 
                href="/privacy-policy" 
                className="text-[#4a9cd6] hover:underline"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className={`${
                isDark 
                  ? "border-gray-700 hover:bg-gray-800" 
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white"
            >
              Accept
            </Button>
            <button
              onClick={handleDecline}
              className={`p-1 rounded-full hover:bg-gray-100 ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <X className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 