"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight, Car, Cpu, Battery, Wrench } from "lucide-react"
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

  const setTabRef = (el: HTMLDivElement | null, index: number) => {
    tabRefs.current[index] = el
  }

  const tabs = [
    {
      title: "ELECTRIC VEHICLES",
      icon: <Car className="w-5 h-5" />,
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
        gradient: "from-blue-500 to-cyan-500",
      },
    },
    {
      title: "SKYWELL TECHNOLOGY",
      icon: <Cpu className="w-5 h-5" />,
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
        gradient: "from-purple-500 to-pink-500",
      },
    },
    {
      title: "BATTERY SYSTEMS",
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
        gradient: "from-orange-500 to-red-500",
      },
    },
    {
      title: "AFTERSALES",
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
        gradient: "from-green-500 to-emerald-500",
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

  useEffect(() => {
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
    <section className={`w-full py-20 relative overflow-hidden ${isDark ? "bg-black" : "bg-gray-50"}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 opacity-30 bg-gradient-to-r ${tabs[activeTab].content.gradient} blur-3xl transition-all duration-500`} />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          EXPLORE <span className={`bg-gradient-to-r ${tabs[activeTab].content.gradient} bg-clip-text text-transparent`}>SKYWELL</span> ESSENTIALS
        </motion.h2>

        {/* Tab Navigation */}
        <div className="relative mb-12">
          <div className="flex flex-wrap justify-center">
            {/* Hover Highlight */}
            <div
              className={`absolute h-[60px] transition-all duration-300 ease-out ${
                isDark ? "bg-white/5" : "bg-black/5"
              } rounded-xl flex items-center pointer-events-none`}
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className={`absolute h-[60px] transition-all duration-300 ease-out pointer-events-none bg-gradient-to-r ${tabs[activeTab].content.gradient} opacity-10 rounded-xl`}
              style={activeStyle}
            />

            {tabs.map((tab, index) => (
              <div
                key={index}
                ref={(el) => setTabRef(el, index)}
                className={`px-6 py-4 cursor-pointer transition-all duration-300 h-[60px] rounded-xl ${
                  index === activeTab
                    ? `text-gradient bg-gradient-to-r ${tab.content.gradient} bg-clip-text text-transparent`
                    : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveTab(index)}
              >
                <div className="flex items-center gap-2 h-full">
                  {tab.icon}
                  <span className="text-sm md:text-base font-medium whitespace-nowrap">
                    {tab.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
            {tabs.map((tab, index) => (
              activeTab === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 lg:order-1">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}
                    >
                      {tab.content.heading}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`text-lg mb-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {tab.content.description}
                    </motion.p>
                    <div className="space-y-4">
                      {tab.content.links.map((link, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <Link 
                            href={link.href} 
                            className={`flex items-center group p-4 rounded-xl transition-all duration-300 ${
                              isDark 
                                ? "hover:bg-white/5" 
                                : "hover:bg-black/5"
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tab.content.gradient} mr-3 group-hover:scale-150 transition-transform duration-300`} />
                            <span className={`text-lg ${isDark ? "text-white" : "text-black"} group-hover:text-gradient group-hover:bg-gradient-to-r ${tab.content.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                              {link.text}
                            </span>
                            <ArrowRight className={`ml-2 h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isDark ? "text-white" : "text-black"}`} />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="order-1 lg:order-2 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative h-[300px] md:h-[400px] w-full">
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.content.gradient} opacity-20 rounded-3xl blur-2xl transform -rotate-6`} />
                      <div className={`absolute inset-0 rounded-3xl ${isDark ? "bg-white/5" : "bg-black/5"} backdrop-blur-xl`} />
                      <Image
                        src={tab.content.image}
                        alt={tab.content.heading}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
