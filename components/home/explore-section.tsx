"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ExploreSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const tabs = [
    {
      title: "ELECTRIC VEHICLES",
      content: {
        heading: "Next Generation Electric Mobility",
        description:
          "Experience the future of transportation with Skywell's innovative electric vehicles. Our range combines cutting-edge technology with elegant design for a sustainable driving experience.",
        image: "/sleek-electric-vehicle.png",
        links: [
          { text: "Skywell ET5", href: "/models/et5" },
          { text: "Skywell EC3", href: "/models/ec3" },
          { text: "Compare Models", href: "/compare" },
        ],
      },
    },
    {
      title: "SKYWELL TECHNOLOGY",
      content: {
        heading: "Innovative EV Technology",
        description:
          "Skywell's proprietary technology sets new standards in the electric vehicle industry. From advanced battery management to intelligent driving systems, we're pushing the boundaries of what's possible.",
        image: "/ev-tech-dashboard.png",
        links: [
          { text: "Battery Technology", href: "/technology/battery" },
          { text: "Smart Connectivity", href: "/technology/connectivity" },
          { text: "Autonomous Features", href: "/technology/autonomous" },
        ],
      },
    },
    {
      title: "BATTERY SYSTEMS",
      content: {
        heading: "Long-lasting Battery Performance",
        description:
          "Our advanced battery systems deliver exceptional range and longevity. With fast-charging capabilities and intelligent thermal management, Skywell batteries are designed for real-world performance.",
        image: "/ev-battery-cutaway.png",
        links: [
          { text: "Battery Specifications", href: "/battery/specs" },
          { text: "Charging Solutions", href: "/battery/charging" },
          { text: "Battery Warranty", href: "/battery/warranty" },
        ],
      },
    },
    {
      title: "AFTERSALES",
      content: {
        heading: "Comprehensive Customer Care",
        description:
          "Our commitment to you extends well beyond your purchase. Skywell's dedicated aftersales service ensures your electric vehicle experience remains exceptional throughout your ownership journey.",
        image: "/modern-auto-care.png",
        links: [
          { text: "Service Centers", href: "/aftersales/service" },
          { text: "Maintenance Plans", href: "/aftersales/maintenance" },
          { text: "Owner Benefits", href: "/aftersales/benefits" },
        ],
      },
    },
  ]

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeTab])

  // Initialize positions after component mounts
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const activeElement = tabRefs.current[activeTab]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`w-full py-20 ${isDark ? "bg-black" : "bg-gray-100"}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          EXPLORE <span className="text-[#4a9cd6]">SKYWELL</span> ESSENTIALS
        </h2>

        {/* Tab Navigation */}
        <div className="relative mb-12 border-b border-gray-700">
          <div className="flex flex-wrap justify-center">
            {/* Hover Highlight */}
            <div
              className={`absolute h-[50px] transition-all duration-300 ease-out ${
                isDark ? "bg-[#4a9cd620]" : "bg-[#4a9cd610]"
              } rounded-t-lg flex items-center pointer-events-none`}
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-2px] h-[2px] bg-[#4a9cd6] transition-all duration-300 ease-out pointer-events-none"
              style={activeStyle}
            />

            {tabs.map((tab, index) => (
              <div
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`px-6 py-3 cursor-pointer transition-colors duration-300 h-[50px] ${
                  index === activeTab
                    ? "text-[#4a9cd6]"
                    : isDark
                      ? "text-white opacity-80 hover:opacity-100"
                      : "text-black opacity-80 hover:opacity-100"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveTab(index)}
              >
                <div className="text-sm md:text-base font-medium whitespace-nowrap flex items-center justify-center h-full">
                  {tab.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeTab === index ? 1 : 0,
                y: activeTab === index ? 0 : 20,
                display: activeTab === index ? "block" : "none",
              }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  {tab.content.heading}
                </h3>
                <p className={`text-lg mb-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {tab.content.description}
                </p>
                <div className="space-y-4">
                  {tab.content.links.map((link, i) => (
                    <Link key={i} href={link.href} className="flex items-center group">
                      <div className="w-2 h-2 bg-[#4a9cd6] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      <span
                        className={`text-lg ${isDark ? "text-white" : "text-black"} group-hover:text-[#4a9cd6] transition-colors duration-300`}
                      >
                        {link.text}
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#4a9cd6]" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                <Image
                  src={tab.content.image || "/placeholder.svg"}
                  alt={tab.content.heading}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 ${isDark ? "bg-gradient-to-r from-black/40 to-transparent" : "bg-gradient-to-r from-white/40 to-transparent"}`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
