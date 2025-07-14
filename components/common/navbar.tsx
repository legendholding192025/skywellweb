"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  const [activeIndex, setActiveIndex] = useState(-1)
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const [imageError, setImageError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const navigation: NavigationItem[] = [
    { 
      name: "Models", 
      href: "/models", 
      submenu: [
        { 
          name: "ET5", 
          href: "/models/et5",
          image: "https://cdn.legendholding.com/images/cdn_68749cd46b0695.08392751_20250714_055948.png",
          description: "Premium Electric SUV"
        }
      ]
    },
    { 
      name: "After Sales",
      href: "/after-sales",
      submenu: [
        {
          name: "Service Center",
          href: "/after-sales/service-center",
          description: "Schedule your vehicle service"
        },
        {
          name: "Support",
          href: "/after-sales/support",
          description: "Get help and assistance"
        }
      ]
    },
    { 
      name: "Finance", 
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
    { name: "Contact", href: "/contact-us" },
  ]

  // Action items that appear on the right side
  const actionItems = [
    { name: "Get a Quote", href: "/get-quote" },
    { name: "Book a Test Drive", href: "/test-drive" },
  ]

  const tabRefs = useRef<(HTMLDivElement | null)[]>(Array(navigation.length + actionItems.length).fill(null))

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Set active index based on current pathname only after mounting
  useEffect(() => {
    if (isMounted) {
      // Check main navigation items first
      const navIndex = navigation.findIndex((item) => {
        // Check for exact match first
        if (item.href === pathname) return true
        
        // Check if pathname starts with the item's href (for submenu items)
        if (item.submenu && pathname.startsWith(item.href)) return true
        
        return false
      })
      
      if (navIndex !== -1) {
        setActiveIndex(navIndex)
      } else {
        // Check action items
        const actionIndex = actionItems.findIndex((item) => item.href === pathname)
        if (actionIndex !== -1) {
          setActiveIndex(navigation.length + actionIndex)
        } else {
          setActiveIndex(-1)
        }
      }
    }
  }, [pathname, isMounted])



  // Update active indicator style only after component is mounted
  useEffect(() => {
    if (isMounted) {
      if (activeIndex === -1) {
        // Hide active indicator when no nav item is active
        setActiveStyle({
          left: "0px",
          width: "0px",
        })
      } else {
        const activeElement = tabRefs.current[activeIndex]
        if (activeElement) {
          const { offsetLeft, offsetWidth } = activeElement
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          })
        }
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



  // If not yet mounted, render a simple placeholder
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/10 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center justify-between px-6 py-3">
            <Link href="/" className="relative z-10">
              <span className={`text-xl font-bold text-white drop-shadow-sm`}>Skywell</span>
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
        scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-black/10 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            {!imageError ? (
              <Image
                src="/logo/skywell-logo.svg"
                alt="Skywell"
                width={100}
                height={24}
                className="h-6 w-auto"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <span className={`text-xl font-bold ${scrolled ? "text-black" : "text-white drop-shadow-sm"}`}>Skywell</span>
            )}
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:block">
            <div className="relative flex items-center space-x-1">
              {/* Active Indicator */}
              <div
                className="absolute bottom-[-6px] h-[2px] bg-[#4a9cd6] pointer-events-none"
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
                      : scrolled 
                        ? "text-black opacity-80 hover:text-[#4a9cd6]"
                        : "text-white opacity-90 hover:text-[#4a9cd6] drop-shadow-sm"
                  }`}

                >
                  {item.submenu ? (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <div className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full">
                          {item.name} <ChevronDown className="ml-1 h-3 w-3" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={20}
                        className="w-[300px] p-2 bg-white/95 backdrop-blur-xl border border-neutral-100 text-black rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <DropdownMenuItem
                            key={`submenu-${subIndex}`}
                            className="flex items-center gap-4 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-black/5 focus:bg-black/5"
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
                              <div className="text-sm truncate text-neutral-500">
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
            <Link href="tel:04-221-9958">
              <Button
                variant="ghost"
                className={`text-sm font-medium mr-3 hidden md:flex items-center gap-2 hover:bg-[rgba(74,156,214,0.2)] group transition-all ${
                  scrolled ? "text-black opacity-80 hover:opacity-100" : "text-white opacity-90 hover:opacity-100 drop-shadow-sm"
                }`}
              >
                <Phone className="h-4 w-4 group-hover:animate-wiggle" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all group-hover:after:w-full">
                  04 221 9958
                </span>
              </Button>
            </Link>

            {/* Action Items - Get Quote and Book Test Drive */}
            {actionItems.map((item, index) => {
              const actualIndex = navigation.length + index
              return (
                <div
                  key={`action-item-${index}`}
                  ref={(el: HTMLDivElement | null) => {
                    tabRefs.current[actualIndex] = el
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] hidden md:flex items-center justify-center mr-4 ${
                    actualIndex === activeIndex
                      ? "text-[#4a9cd6]"
                      : scrolled 
                        ? "text-black opacity-80 hover:text-[#4a9cd6]"
                        : "text-white opacity-90 hover:text-[#4a9cd6] drop-shadow-sm"
                  }`}

                  onClick={() => router.push(item.href)}
                >
                  <div className="text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              )
            })}

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden hover:bg-[rgba(74,156,214,0.2)] ${scrolled ? "text-black" : "text-white drop-shadow-sm"}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-white/95 backdrop-blur-xl text-black border-neutral-200"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    {!imageError ? (
                      <Image
                        src="/logo/skywell-logo.svg"
                        alt="Skywell"
                        width={100}
                        height={24}
                        className="h-6 w-auto"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span className="text-xl font-bold">Skywell</span>
                    )}
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-[rgba(74,156,214,0.2)] text-black"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col space-y-6 mt-8">
                    {navigation.map((item) => (
                      <div key={`mobile-${item.name}`}>
                        {item.submenu ? (
                          <div className="space-y-3">
                            <div className="text-lg font-medium text-black opacity-80">
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
                                      : "text-black/70 hover:text-[#4a9cd6]"
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
                                : "text-black opacity-80 hover:text-[#4a9cd6]"
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                    {/* Action Items in Mobile Menu */}
                    {actionItems.map((item) => (
                      <div key={`mobile-action-${item.name}`}>
                        <Link
                          href={item.href}
                          className={`text-lg font-medium ${
                            pathname === item.href
                              ? "text-[#4a9cd6]"
                              : "text-black opacity-80 hover:text-[#4a9cd6]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
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
