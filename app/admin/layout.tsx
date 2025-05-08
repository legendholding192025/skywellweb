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
]

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
