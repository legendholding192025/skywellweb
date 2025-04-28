"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"

export function SpecsSection() {
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
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1])
  const rotate = useTransform(scrollYProgress, [0.1, 0.3], [-1, 0])

  const specs = [
    { name: "Range", value: "520 km (NEDC)", highlight: true, icon: "/icons/range.svg" },
    { name: "Battery", value: "72 kWh Lithium-ion", highlight: true, icon: "/icons/battery.svg" },
    { name: "Power", value: "150 kW (204 PS)", highlight: false, icon: "/icons/power.svg" },
    { name: "Acceleration", value: "0-100 km/h in 7.9s", highlight: false, icon: "/icons/acceleration.svg" },
    { name: "Fast Charging", value: "30% to 80% in 30 min", highlight: true, icon: "/icons/charging.svg" },
    { name: "Drive Type", value: "Front-wheel drive", highlight: false, icon: "/icons/drive.svg" },
    { name: "Dimensions", value: "4698×1908×1696 mm", highlight: false, icon: "/icons/dimensions.svg" },
    { name: "Cargo Space", value: "Up to 1176L", highlight: true, icon: "/icons/cargo.svg" },
    { name: "Infotainment", value: "12.8-inch touchscreen", highlight: false, icon: "/icons/infotainment.svg" },
  ]

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center overflow-hidden py-20 perspective-1000 ${
        isDark ? "bg-neutral-900" : "bg-white"
      }`}
    >
      <motion.div
        className="max-w-[1400px] mx-auto w-full px-6"
        style={{
          opacity,
          y,
          scale,
          rotateX: rotate,
        }}
      >
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 text-center ${isDark ? "text-white" : "text-black"}`}>
          Skywell ET5 Specifications
        </h2>
        <p className={`text-lg max-w-2xl mx-auto text-center mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          The Skywell ET5 combines cutting-edge technology with impressive performance metrics to deliver a premium electric SUV experience.
        </p>

        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full w-full relative"
            >
              <Image 
                src="/et5-side-view.png" 
                alt="Skywell ET5 Side View" 
                fill 
                className="object-contain rounded-xl"
              />
            </motion.div>
          </div>
          <div className="md:w-1/2 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                Performance Highlights
              </h3>
              <ul className="space-y-3">
                <li className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <span className="text-[#4a9cd6]">✓</span> Advanced 72 kWh battery technology
                </li>
                <li className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <span className="text-[#4a9cd6]">✓</span> 520 km range on a single charge
                </li>
                <li className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <span className="text-[#4a9cd6]">✓</span> Fast charging capability
                </li>
                <li className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <span className="text-[#4a9cd6]">✓</span> Spacious interior with up to 1176L cargo space
                </li>
                <li className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <span className="text-[#4a9cd6]">✓</span> 12.8-inch central touchscreen with smart connectivity
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <h3 className={`text-2xl font-semibold mb-8 text-center ${isDark ? "text-white" : "text-black"}`}>
          Detailed Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.name}
              className={`p-8 rounded-3xl shadow-lg ${
                spec.highlight ? "bg-[#4a9cd6]/10" : isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
              initial={{ opacity: 0, y: 50, z: -50 }}
              whileInView={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                z: 30,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center mb-4">
                {spec.icon && (
                  <div className={`w-12 h-12 mr-4 flex items-center justify-center rounded-full ${
                    spec.highlight ? "bg-[#4a9cd6]/20" : isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    <Image src={spec.icon} alt={spec.name} width={24} height={24} className={isDark ? "opacity-80" : ""} />
                  </div>
                )}
                <h3 className={`text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-500"}`}>{spec.name}</h3>
              </div>
              <p
                className={`text-2xl font-bold ${spec.highlight ? "text-[#4a9cd6]" : isDark ? "text-white" : "text-black"}`}
              >
                {spec.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
