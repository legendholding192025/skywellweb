"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"

export function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const designFeatures = [
    {
      title: "Aerodynamic Design",
      description: "Streamlined body with a drag coefficient of just 0.29 Cd, enhancing range and efficiency.",
      icon: "/icons/aerodynamic.svg",
      image: "/images/sideview.webp"
    },
    {
      title: "LED Matrix Headlights",
      description: "Intelligent headlights that adapt to driving conditions and feature distinctive daytime running lights.",
      icon: "/icons/headlights.svg",
      image: "/et5-headlights.png"
    },
    {
      title: "Panoramic Glass Roof",
      description: "Expansive glass roof with UV protection that creates an open, airy cabin experience.",
      icon: "/icons/roof.svg",
      image: "/images/interior1.png"
    },
    {
      title: "Premium Interior",
      description: "High-quality materials with ergonomic design and customizable ambient lighting.",
      icon: "/icons/interior.svg",
      image: "/images/interiorleather.png"
    },
  ]

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center overflow-hidden py-20 ${
        isDark ? "bg-neutral-950" : "bg-gray-50"
      }`}
    >
      <motion.div
        className="max-w-[1400px] mx-auto w-full px-6"
        style={{
          opacity,
          y,
        }}
      >
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 text-center ${isDark ? "text-white" : "text-black"}`}>
          Skywell ET5 Design
        </h2>
        <p className={`text-lg max-w-2xl mx-auto text-center mb-16 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Combining elegance with functionality, the Skywell ET5 features a modern SUV design language with attention to every detail.
        </p>

        <div className="mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden"
          >
            <Image 
              src="/et5-hero.png" 
              alt="Skywell ET5 Full View" 
              fill 
              className="object-cover"
            />
            <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-r from-black/60 to-transparent" : "bg-gradient-to-r from-white/60 to-transparent"}`}>
              <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-lg">
                <h3 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  Modern SUV Design
                </h3>
                <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  The Skywell ET5 features a bold stance with clean lines and sophisticated details, creating a premium yet approachable design language.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-24">
          {designFeatures.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div className="md:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <div className={`p-8 rounded-xl ${isDark ? "bg-neutral-900" : "bg-white"} shadow-lg`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"} mr-4`}>
                      <Image src={feature.icon} alt="" width={28} height={28} />
                    </div>
                    <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>{feature.title}</h3>
                  </div>
                  <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mt-24 p-8 rounded-2xl ${isDark ? "bg-blue-900/20" : "bg-blue-50"} text-center`}
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
            Design meets Technology
          </h3>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Every element of the Skywell ET5 design has been carefully crafted to create a perfect balance between aesthetics and functionality, ensuring an exceptional driving experience.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
