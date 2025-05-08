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

interface SubMenuItem {
  name: string
  href: string
  image?: string
  description: string
}

interface NavigationItem {
  name: string
  href: string
  submenu?: SubMenuItem[]
}

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

  const navigation: NavigationItem[] = [
    { 
      name: "Models", 
      href: "/models", 
      submenu: [
        { 
          name: "ET5", 
          href: "/models/et5",
          image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745837231/skywell_img-car-km-01_waz8sk.png",
          description: "Premium Electric SUV"
        }
      ]
    },
    
    { 
      name: "Finance & Offers", 
      href: "/finance",
      submenu: [
        {
          name: "Finance Calculator",
          href: "/finance/calculator",
          description: "Estimate your monthly payments"
        },
        {
          name: "Special Offers",
          href: "/finance/offers",
          description: "View current deals and promotions"
        }
      ]
    },
    { name: "Blogs", href: "/blogs" },
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
              {/* Hover Highlight */}
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
                >
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full">
                          {item.name} <ChevronDown className="ml-1 h-3 w-3" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={20}
                        className={`w-[300px] p-2 ${
                          isDark
                            ? "bg-black/95 backdrop-blur-xl border border-neutral-800 text-white"
                            : "bg-white/95 backdrop-blur-xl border border-neutral-100 text-black"
                        } rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95`}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <DropdownMenuItem
                            key={`submenu-${subIndex}`}
                            className={`flex items-center gap-4 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                              isDark 
                                ? "hover:bg-white/10 focus:bg-white/10" 
                                : "hover:bg-black/5 focus:bg-black/5"
                            }`}
                            onClick={() => router.push(subItem.href)}
                          >
                            {subItem.image && (
                              <div className="flex-shrink-0 relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <Image 
                                  src={subItem.image}
                                  alt={subItem.name}
                                  width={60}
                                  height={60}
                                  className="object-contain w-full h-full"
                                  sizes="60px"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{subItem.name}</div>
                              <div className={`text-sm truncate ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                {subItem.description}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div
                      className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full"
                      onClick={() => {
                        setActiveIndex(index)
                        router.push(item.href)
                      }}
                    >
                      {item.name}
                    </div>
                  )}
                </div>
              ))}
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
                      <div key={`mobile-${item.name}`}>
                        {item.submenu ? (
                          <div className="space-y-3">
                            <div className={`text-lg font-medium ${
                              isDark ? "text-white opacity-80" : "text-black opacity-80"
                            }`}>
                              {item.name}
                            </div>
                            <div className="pl-4 space-y-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className={`block text-base ${
                                    pathname === subItem.href
                                      ? "text-[#4a9cd6]"
                                      : isDark
                                        ? "text-white/70 hover:text-white"
                                        : "text-black/70 hover:text-black"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
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
                        )}
                      </div>
                    ))}
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
