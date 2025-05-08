"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("admin_token")
    
    if (!token) {
      router.push("/admin/login")
    } else {
      router.push("/admin/dashboard")
    }
  }, [])

  // Return null or a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  )
} 