"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Battery, Zap, Gauge, Shield } from "lucide-react"

export function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Enhanced parallax effects
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1])
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [5, 0])
  const imageZ = useTransform(scrollYProgress, [0, 0.5], [-50, 50])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Charging",
      description: "80% charge in just 30 minutes",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "Long Range",
      description: "Up to 500km on a single charge",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Performance",
      description: "0-100 km/h in 4.9 seconds",
      color: "from-orange-500 to-red-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety",
      description: "5-star safety rating",
      color: "from-green-500 to-emerald-400",
    },
  ]

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${
        isDark 
          ? "bg-gradient-to-b from-black via-gray-900 to-black" 
          : "bg-gradient-to-b from-white via-gray-50 to-white"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 py-20 md:py-32 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Experience the Future of Driving
          </h2>
          <p className={`text-lg md:text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Cutting-edge technology meets exceptional performance in every Skywell vehicle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with 3D effect */}
          <motion.div
            className="relative order-2 lg:order-1"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              rotateY: imageRotateY,
              z: imageZ,
            }}
          >
            <div className="relative h-[300px] md:h-[500px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl transform -rotate-6" />
              <Image
                src="/images/sideview.png"
                alt="Skywell ET5"
                fill
                className="object-contain relative z-10"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 rounded-2xl backdrop-blur-xl ${
                  isDark 
                    ? "bg-white/5 hover:bg-white/10" 
                    : "bg-white/80 hover:bg-white shadow-lg"
                } transition-all duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-2xl`} />
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
