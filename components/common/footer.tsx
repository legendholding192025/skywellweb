"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const { resolvedTheme } = useTheme()
  // Use state for isDark to avoid hydration mismatch
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only set theme after component is mounted on client
  useEffect(() => {
    setIsMounted(true)
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  // Update theme when it changes
  useEffect(() => {
    if (isMounted) {
      setIsDark(resolvedTheme === "dark")
    }
  }, [resolvedTheme, isMounted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this to your API
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  ]

  // Return a placeholder while component is mounting
  if (!isMounted || isDark === null) {
    return (
      <footer className="w-full bg-transparent pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6"></div>
      </footer>
    );
  }

  return (
    <footer className={`w-full ${isDark ? "bg-black" : "bg-gray-100"} pt-16 pb-8`}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Footer Content - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/skywell-logo.svg"
                alt="Skywell"
                width={120}
                height={30}
                className={`h-8 w-auto ${isDark ? "" : "filter invert"}`}
              />
            </Link>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm leading-relaxed`}>
              Legend Holding is the official dealership of Skywell Electric Vehicles in the UAE, bringing innovative and
              sustainable transportation solutions to the region.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  } p-2 rounded-full hover:bg-[#4a9cd6] hover:text-white transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Company Links */}
            <div className="space-y-4">
              <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainability"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/test-drive"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    Book a Test Drive
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    Service Centers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className={`text-sm ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                    } hover:underline transition-colors duration-200`}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>Stay Updated</h3>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  className={`pl-10 ${
                    isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white transition-colors duration-300"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-500"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Dealership Info */}
        <div
          className={`py-8 px-6 rounded-xl mb-12 ${
            isDark ? "bg-gray-900" : "bg-white"
          } flex flex-col md:flex-row items-center justify-between gap-6`}
        >
          <div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>Visit Our Showroom</h3>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Experience Skywell electric vehicles at our state-of-the-art showroom in Dubai.
            </p>
          </div>
          <Button
            className="bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white px-6 py-2"
            onClick={() => window.open("/locations", "_blank")}
          >
            Find Locations
          </Button>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4 md:mb-0`}>
              © {new Date().getFullYear()} Legend Holding. All rights reserved. Official Skywell Dealership in UAE.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className={`text-sm ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } transition-colors duration-200`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`text-sm ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } transition-colors duration-200`}
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className={`text-sm ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } transition-colors duration-200`}
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
