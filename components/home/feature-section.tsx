"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Battery, Zap, Gauge, Shield, ChevronRight } from "lucide-react"

export function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const leftFeatures = [
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Fast Charging",
      description: "80% charge in just 30 minutes",
      stat: "30min",
      detail: "DC Fast Charging",
    },
    {
      icon: <Battery className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Long Range",
      description: "Up to 500km on a single charge",
      stat: "500km",
      detail: "WLTP Range",
    },
  ]

  const rightFeatures = [
    {
      icon: <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Performance",
      description: "0-100 km/h in 4.9 seconds",
      stat: "4.9s",
      detail: "0-100 km/h",
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Safety",
      description: "5-star safety rating",
      stat: "5★",
      detail: "Safety Rating",
    },
  ]

  // Parallax and scroll animations
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[100vh] flex flex-col justify-center overflow-hidden ${
        isDark ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={isDark ? "#4a9cd6" : "#4a9cd6"} stopOpacity="0.2" />
                <stop offset="100%" stopColor={isDark ? "#000000" : "#ffffff"} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
          </svg>
        </div>

        {/* Animated circles */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 -right-20 w-80 h-80"
        >
          <div className="absolute inset-0 bg-[#4a9cd6]/10 rounded-full blur-3xl" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96"
        >
          <div className="absolute inset-0 bg-[#4a9cd6]/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative w-full py-8 sm:py-12 md:py-16 flex flex-col">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <div className="w-6 sm:w-10 h-1 bg-[#4a9cd6]" />
            <span className="text-[#4a9cd6] font-medium uppercase tracking-wider text-xs sm:text-sm">
              Revolutionary
            </span>
            <div className="w-6 sm:w-10 h-1 bg-[#4a9cd6]" />
          </motion.div>

          <h2
            className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Next Generation
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3]">
              {" "}
              Innovation
            </span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Experience the perfect blend of performance, technology, and sustainability
          </p>
        </motion.div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Car Image - Mobile */}
          <motion.div
            style={{ scale }}
            className="relative h-[250px] sm:h-[300px] flex items-center justify-center mx-auto w-full max-w-[80%]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a9cd6]/20 to-transparent rounded-3xl blur-3xl transform -rotate-12" />

            {/* Car image with floating effect */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              <Image
                src="https://cdn.legendholding.com/images/cdn_68749cd46b0695.08392751_20250714_055948.png"
                alt="Skywell ET5"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Features Grid - Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[...leftFeatures, ...rightFeatures].map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} isDark={isDark} isMobile={true} />
            ))}
          </div>
        </div>

        {/* Desktop Layout - 3 Columns */}
        <div className="hidden lg:grid flex-1 grid-cols-3 gap-8 items-center">
          {/* Left Features */}
          <div className="space-y-4">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} isDark={isDark} isMobile={false} />
            ))}
          </div>

          {/* 3D Car Visualization - Center */}
          <motion.div style={{ y, scale }} className="relative h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a9cd6]/20 to-transparent rounded-3xl blur-3xl transform -rotate-12" />

            {/* Car image with floating effect */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              <Image
                src="https://cdn.legendholding.com/images/cdn_68749cd46b0695.08392751_20250714_055948.png"
                alt="Skywell ET5"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Features */}
          <div className="space-y-4">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} isDark={isDark} isMobile={false} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <button className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3] text-white text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            Book a Test Drive
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// Extracted Feature Card component for cleaner code
function FeatureCard({
  feature,
  index,
  isDark,
  isMobile,
}: {
  feature: {
    icon: React.ReactNode
    title: string
    description: string
    stat: string
    detail: string
  }
  index: number
  isDark: boolean
  isMobile: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : index % 2 === 0 ? -30 : 30, y: isMobile ? 20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-xl backdrop-blur-sm ${
        isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
      } transition-all duration-300 border border-transparent hover:border-[#4a9cd6]/30 h-full`}
    >
      <div className="p-3 sm:p-4 md:p-5 h-full">
        <div className="flex items-start gap-3 sm:gap-4 h-full">
          {/* Icon Container */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-[#4a9cd6]/20 rounded-lg blur-lg transform group-hover:scale-110 transition-transform duration-500" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#4a9cd6] to-[#2d7eb3] flex items-center justify-center text-white shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
              {feature.icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 sm:gap-2 mb-1">
              <h3 className={`text-base sm:text-lg font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                {feature.title}
              </h3>
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3] whitespace-nowrap">
                {feature.stat}
              </span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-[#4a9cd6]/30 to-transparent mb-1.5 sm:mb-2" />
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xs sm:text-sm mb-1 line-clamp-2`}>
              {feature.description}
            </p>
            <div className="flex items-center text-xs text-[#4a9cd6] font-medium">
              {feature.detail}
              <ChevronRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect gradient border */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a9cd6]/20 to-transparent opacity-30" />
      </motion.div>
    </motion.div>
  )
}
