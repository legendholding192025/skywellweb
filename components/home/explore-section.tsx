"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Car, Cpu, Battery, Wrench, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ExploreSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Using the blue color from the original code as the primary brand color
  const brandColor = "#4a9cd6"
  const brandColorLight = "#6fb3e2"
  const brandColorDark = "#3a7ca6"

  const tabs = [
    {
      title: "Electric Vehicles",
      icon: <Car className="w-5 h-5" />,
      content: {
        heading: "Next Generation Electric Mobility",
        description:
          "Experience the future of transportation with Skywell's innovative electric vehicles. Our range combines cutting-edge technology with elegant design for a sustainable driving experience.",
        image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745837284/Skywell-et5-lr-17_result_qxmiq7.jpg",
        links: [
          { text: "Skywell ET5", href: "/models/et5" },
          { text: "Skywell EC3", href: "/models/ec3" },
          { text: "Compare Models", href: "/compare" },
        ],
      },
    },
    {
      title: "Technology",
      icon: <Cpu className="w-5 h-5" />,
      content: {
        heading: "Innovative EV Technology",
        description:
          "Skywell's proprietary technology sets new standards in the electric vehicle industry. From advanced battery management to intelligent driving systems, we're pushing the boundaries of what's possible.",
        image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745840392/IMG_04001_1_tgz1r8.jpg",
        links: [
          { text: "Battery Technology", href: "/technology/battery" },
          { text: "Smart Connectivity", href: "/technology/connectivity" },
          { text: "Autonomous Features", href: "/technology/autonomous" },
        ],
      },
    },
    {
      title: "Battery Systems",
      icon: <Battery className="w-5 h-5" />,
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
      title: "Aftersales",
      icon: <Wrench className="w-5 h-5" />,
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

  return (
    <section className={`w-full py-16 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Explore <span style={{ color: brandColor }}>Skywell</span> Essentials
          </h2>
        </div>

        {/* Simple Tab Navigation */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex whitespace-nowrap">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors ${
                  activeTab === index
                    ? `border-[${brandColor}] text-[${brandColor}]`
                    : `border-transparent ${
                        isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                      }`
                }`}
                style={activeTab === index ? { borderColor: brandColor, color: brandColor } : {}}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Content */}
          <div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {tabs[activeTab].content.heading}
            </h3>
            <p className={`text-base mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {tabs[activeTab].content.description}
            </p>

            <div className="space-y-2">
              {tabs[activeTab].content.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{link.text}</span>
                  <ChevronRight className="h-5 w-5" style={{ color: brandColor }} />
                </Link>
              ))}
            </div>

            {/* Mobile Tab Indicator */}
            <div className="flex justify-center gap-1 mt-8 lg:hidden">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: index === activeTab ? brandColor : isDark ? "#4b5563" : "#d1d5db",
                  }}
                  aria-label={`Go to tab ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={tabs[activeTab].content.image || "/placeholder.svg"}
              alt={tabs[activeTab].content.heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-16 flex items-center px-4"
              style={{ backgroundColor: `${brandColor}99` }} // Using hex with alpha
            >
              <div className="flex items-center gap-2 text-white">
                {tabs[activeTab].icon}
                <span className="font-medium">{tabs[activeTab].title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
