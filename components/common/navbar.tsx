"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "next-themes"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({ left: "0px", width: "0px", opacity: 0 })
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const [imageError, setImageError] = useState(false)
  const { resolvedTheme } = useTheme()
  // Important: Set a default isDark to null initially to avoid hydration mismatch
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const navigation = [
    { name: "Models", href: "/models" },
    { name: "Features", href: "/features" },
    { name: "Charging", href: "/charging" },
    { name: "Support", href: "/support" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  const tabRefs = useRef<(HTMLDivElement | null)[]>(Array(navigation.length + 1).fill(null))

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
    // Only set isDark after component is mounted to avoid hydration mismatch
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  // Update isDark when theme changes, but only after mounted
  useEffect(() => {
    if (isMounted) {
      setIsDark(resolvedTheme === "dark")
    }
  }, [resolvedTheme, isMounted])

  // Set active index based on current pathname only after mounting
  useEffect(() => {
    if (isMounted) {
      const currentIndex = navigation.findIndex((item) => item.href === pathname)
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex)
      }
    }
  }, [pathname, isMounted])

  // Update hover style only after component is mounted
  useEffect(() => {
    if (isMounted && hoveredIndex !== null) {
      // Add small delay to avoid rapid hover changes
      const timer = setTimeout(() => {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
          opacity: 1
        })
      }
      }, 5);
      return () => clearTimeout(timer);
    } else {
      setHoverStyle({ left: "0px", width: "0px", opacity: 0 })
    }
  }, [hoveredIndex, isMounted])

  // Update active indicator style only after component is mounted
  useEffect(() => {
    if (isMounted) {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [activeIndex, isMounted])

  // Add scroll listener only after mount
  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMounted])

  // If not yet mounted or theme not resolved, render a simple placeholder
  if (!isMounted || isDark === null) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center justify-between px-6 py-3">
            <Link href="/" className="relative z-10">
              <span className="text-xl font-bold">Skywell</span>
            </Link>
            <div />
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? (isDark ? "bg-black/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md") : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            {!imageError ? (
              <Image
                src="https://res.cloudinary.com/dckrspiqe/image/upload/v1745844359/skywell-logo_yfkg37.svg"
                alt="Skywell"
                width={100}
                height={24}
                className="h-6 w-auto"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <span className="text-xl font-bold">Skywell</span>
            )}
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:block">
            <div className="relative flex items-center space-x-1">
              {/* Hover Highlight - with explicit opacity in style */}
              <div
                className={`absolute h-[30px] transition-all duration-300 ease-out ${
                  isDark ? "bg-[rgba(74,156,214,0.2)]" : "bg-[rgba(74,156,214,0.1)]"
                } rounded-[6px] flex items-center pointer-events-none`}
                style={hoverStyle}
              />

              {/* Active Indicator */}
              <div
                className="absolute bottom-[-6px] h-[2px] bg-[#4a9cd6] transition-all duration-300 ease-out pointer-events-none"
                style={activeStyle}
              />

              {/* Navigation Items */}
              {navigation.map((item, index) => (
                <div
                  key={`nav-item-${index}`}
                  ref={(el: HTMLDivElement | null) => {
                    tabRefs.current[index] = el
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                    index === activeIndex
                      ? "text-[#4a9cd6]"
                      : isDark
                        ? "text-white opacity-80 hover:opacity-100"
                        : "text-black opacity-80 hover:opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setActiveIndex(index)
                    router.push(item.href)
                  }}
                >
                  <div className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full">
                    {item.name}
                  </div>
                </div>
              ))}

              {/* Shop Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    ref={(el: HTMLDivElement | null) => {
                      tabRefs.current[navigation.length] = el
                    }}
                    className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                      isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                    }`}
                    onMouseEnter={() => setHoveredIndex(navigation.length)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full">
                      Shop <ChevronDown className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`${
                    isDark
                      ? "bg-black/90 backdrop-blur-lg border-neutral-800 text-white"
                      : "bg-white/90 backdrop-blur-lg border-neutral-200 text-black"
                  }`}
                >
                  <DropdownMenuItem className={`focus:bg-[rgba(74,156,214,0.2)]`}>
                    <Link href="/shop/ev-models" className="w-full">
                      EV Models
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`focus:bg-[rgba(74,156,214,0.2)]`}>
                    <Link href="/shop/accessories" className="w-full">
                      Accessories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`focus:bg-[rgba(74,156,214,0.2)]`}>
                    <Link href="/shop/charging" className="w-full">
                      Charging Solutions
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <div className="mr-4">
              <ThemeToggle />
            </div>

            <Link href="/get-quote">
              <Button
                variant="ghost"
                className={`text-sm font-medium mr-3 hidden md:flex hover:bg-[rgba(74,156,214,0.2)] transition-colors ${
                  isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                }`}
              >
                Get a Quote
              </Button>
            </Link>

            <Link href="/test-drive">
              <Button
                variant="ghost"
                className={`text-sm font-medium mr-4 hidden md:flex hover:bg-[rgba(74,156,214,0.2)] transition-colors ${
                  isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                }`}
              >
                Book a Test Drive
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden hover:bg-[rgba(74,156,214,0.2)] ${isDark ? "text-white" : "text-black"}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`w-full sm:w-80 ${
                  isDark 
                    ? "bg-black/95 backdrop-blur-xl text-white border-neutral-800" 
                    : "bg-white/95 backdrop-blur-xl text-black border-neutral-200"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    {!imageError ? (
                      <Image
                        src="https://res.cloudinary.com/dckrspiqe/image/upload/v1745844359/skywell-logo_yfkg37.svg"
                        alt="Skywell"
                        width={100}
                        height={24}
                        className="h-6 w-auto"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span className="text-xl font-bold">Skywell</span>
                    )}
                    <div className="flex items-center gap-4">
                      <ThemeToggle />
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`hover:bg-[rgba(74,156,214,0.2)] ${isDark ? "text-white" : "text-black"}`}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-6 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={`mobile-${item.name}`}
                        href={item.href}
                        className={`text-lg font-medium ${
                          pathname === item.href
                            ? "text-[#4a9cd6]"
                            : isDark
                              ? "text-white opacity-80 hover:opacity-100"
                              : "text-black opacity-80 hover:opacity-100"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/shop"
                      className={`text-lg font-medium ${
                        isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                      }`}
                    >
                      Shop
                    </Link>
                    <Link
                      href="/get-quote"
                      className={`text-lg font-medium ${
                        isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                      }`}
                    >
                      Get a Quote
                    </Link>
                    <Link
                      href="/test-drive"
                      className={`text-lg font-medium ${
                        isDark ? "text-white opacity-80 hover:opacity-100" : "text-black opacity-80 hover:opacity-100"
                      }`}
                    >
                      Book a Test Drive
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
