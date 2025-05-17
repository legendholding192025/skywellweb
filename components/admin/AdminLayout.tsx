"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import {
  LayoutDashboard,
  Phone,
  Car,
  Calculator,
  Mail,
  FileText,
  Menu,
  LogOut,
  X,
  ChevronRight,
  Bell,
  Wrench,
  Gift,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Service Bookings",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Contact Leads",
    href: "/admin/contacts",
    icon: Phone,
  },
  {
    title: "Test Drive Requests",
    href: "/admin/test-drive",
    icon: Car,
  },
  {
    title: "Quote Requests",
    href: "/admin/quotes",
    icon: Calculator,
  },
  {
    title: "Newsletter Subscribers",
    href: "/admin/newsletter",
    icon: Mail,
  },
  {
    title: "Blog Posts",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Offers",
    href: "/admin/offers",
    icon: Gift,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on login or register page
    if (pathname === "/admin/login" || pathname === "/admin/register") {
      setIsLoading(false)
      return
    }

    // Check for authentication
    const token = Cookies.get("admin_token")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [pathname, router])

  const handleLogout = () => {
    Cookies.remove("admin_token")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-blue-400 animate-spin animation-delay-150"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50 
        ${isSidebarOpen ? "w-72" : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"}`}
      >
        <div
          className={`flex items-center justify-between p-5 border-b border-gray-100 ${!isSidebarOpen && !isMobile ? "justify-center" : ""}`}
        >
          {(isSidebarOpen || isMobile) && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                S
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Skywell Admin
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`p-2 rounded-lg hover:bg-gray-100 text-gray-500 ${!isSidebarOpen && !isMobile ? "hidden" : ""}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={`flex items-center ${!isSidebarOpen && !isMobile ? "justify-center" : "justify-between"} px-4 py-3 rounded-lg transition-all duration-200
                            ${
                              isActive
                                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-200"
                                : "text-gray-700 hover:bg-blue-50"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                              {(isSidebarOpen || isMobile) && <span className="font-medium">{item.title}</span>}
                            </div>
                            {(isSidebarOpen || isMobile) && isActive && <ChevronRight className="h-4 w-4" />}
                          </Link>
                        </TooltipTrigger>
                        {!isSidebarOpen && !isMobile && (
                          <TooltipContent side="right" className="bg-white text-gray-900 border-gray-200">
                            <p>{item.title}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className={`flex items-center ${!isSidebarOpen && !isMobile ? "justify-center" : "justify-between"} w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span className="font-medium">Logout</span>}
                  </div>
                  {(isSidebarOpen || isMobile) && <ChevronRight className="h-4 w-4 opacity-70" />}
                </button>
              </TooltipTrigger>
              {!isSidebarOpen && !isMobile && (
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? "lg:pl-72" : "lg:pl-20"}`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="text-sm font-medium text-gray-800 hidden sm:block">
                {navItems.find((item) => item.href === pathname)?.title || "Dashboard"}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white"></span>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 border border-gray-200">
                  <AvatarFallback className="bg-blue-500 text-white">A</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@skywell.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
} 