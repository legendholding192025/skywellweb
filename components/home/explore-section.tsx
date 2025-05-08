"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Car, Cpu, Battery, Wrench } from "lucide-react"
import Image from "next/image"

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
      title: "Electric Innovation",
      icon: <Battery className="w-5 h-5" />,
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745840392/IMG_04001_1_tgz1r8.jpg",
      content: {
        heading: "Electric Innovation",
        description:
          "Skywell specializes in electric and new energy vehicles, offering zero-emission mobility without compromising on performance or style.",
      },
    },
    {
      title: "Smart Technology",
      icon: <Cpu className="w-5 h-5" />,
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745840392/IMG_04001_1_tgz1r8.jpg",
      content: {
        heading: "Smart Technology",
        description:
          "Equipped with advanced AI-powered features, Skywell vehicles include intelligent infotainment systems, smart navigation, and driver-assistance technologies.",
      },
    },
    {
      title: "Premium Design",
      icon: <Car className="w-5 h-5" />,
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745840656/Skywell-Ulu-Motor-ile-Turkiyede-_xvoaux.jpg",
      content: {
        heading: "Premium Design",
        description:
          "With spacious, modern interiors and sleek exterior styling, Skywell combines comfort and luxury with everyday practicality.",
      },
    },
    {
      title: "Exceptional Value",
      icon: <Battery className="w-5 h-5" />,
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745836815/Skywell-HT_i_1303_Edit-_vwoihj.png",
      content: {
        heading: "Exceptional Value",
        description:
          "Skywell delivers high-end features at a competitive price point, making advanced electric driving accessible to more customers.",
      },
    },
    {
      title: "Trusted Support in the UAE",
      icon: <Wrench className="w-5 h-5" />,
      image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1745837231/skywell_img-car-km-01_waz8sk.png",
      content: {
        heading: "Trusted Support in the UAE",
        description:
          "Distributed exclusively by Legend Motors, Skywell owners benefit from reliable aftersales service, warranty coverage, and local expertise.",
      },
    },
  ]

  return (
    <section
      className={`w-full h-screen flex flex-col ${isDark ? "bg-gray-900" : "bg-white"}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex-1 flex flex-col max-w-[1400px] w-full mx-auto px-4 md:px-6 py-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Explore <span style={{ color: brandColor }}>Skywell</span> Essentials
          </h2>
        </div>

        {/* Centered Tab Navigation */}
        <div className="mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
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

        {/* Tab Content - Heading and Description First, Then Image */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Left Side: Content */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {tabs[activeTab].content.heading}
              </h3>
              <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {tabs[activeTab].content.description}
              </p>
            </div>

            {/* Tab Indicator Pills - Moved to content section */}
            <div className="flex gap-2 mt-8">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor: index === activeTab ? brandColor : isDark ? "#4b5563" : "#d1d5db",
                  }}
                  aria-label={`Go to tab ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full">
              <Image
                src={tabs[activeTab].image || "/placeholder.svg"}
                alt={tabs[activeTab].title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
