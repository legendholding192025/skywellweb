"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Wind, Lightbulb, Umbrella, Sofa, ChevronRight, ChevronLeft, BarChart3 } from "lucide-react"

export function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Brand colors
  const brandPrimary = "#4a9cd6"
  const brandSecondary = "#2d7eb3"
  const brandLight = "#e6f3fc"

  // Enhanced parallax and animation effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1])

  const designFeatures = [
    {
      title: "Aerodynamic Excellence",
      description:
        "Sleek profile with optimized aerodynamics for enhanced efficiency and range. The carefully sculpted body reduces drag and improves stability at high speeds.",
      image: "/aerodynamic-design.png",
      icon: <Wind className="w-6 h-6 text-white" />,
      stat: "0.28 Cd",
      detail: "Drag Coefficient",
    },
    {
      title: "LED Matrix Headlights",
      description:
        "Advanced lighting system with adaptive beam pattern for optimal visibility in all conditions. The intelligent system adjusts automatically to oncoming traffic.",
      image: "/modern-car-headlights-blue.png",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      stat: "1500 lm",
      detail: "Luminous Flux",
    },
    {
      title: "Panoramic Glass Roof",
      description:
        "Expansive glass roof creating an open, airy cabin experience with UV protection and electronic tinting for comfort in all weather conditions.",
      image: "/luxury-car-panoramic-roof.png",
      icon: <Umbrella className="w-6 h-6 text-white" />,
      stat: "2.1 m²",
      detail: "Glass Area",
    },
    {
      title: "Premium Interior",
      description:
        "Luxurious materials and modern design for ultimate comfort. Sustainable vegan leather options and recycled materials combine luxury with environmental responsibility.",
      image: "/luxurious-blue-interior.png",
      icon: <Sofa className="w-6 h-6 text-white" />,
      stat: "Premium",
      detail: "Materials",
    },
  ]

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentSlide((prev) => (prev === designFeatures.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, designFeatures.length])

  // Navigation functions
  const nextSlide = () => {
    setAutoplay(false)
    setDirection(1)
    setCurrentSlide((prev) => (prev === designFeatures.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setAutoplay(false)
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? designFeatures.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setAutoplay(false)
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.85,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  }

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden py-20 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit board pattern */}
        <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="design-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 10,0 L 10,10 M 0,10 L 20,10" stroke={isDark ? "white" : "black"} strokeWidth="0.5" fill="none" />
            <circle cx="10" cy="10" r="1.5" fill={brandPrimary} />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#design-pattern)" />
        </svg>

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#4a9cd6]/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#4a9cd6]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <motion.div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 relative"
        style={{
          opacity,
          y,
          scale,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#4a9cd6]" />
            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#4a9cd6]/10">
              <BarChart3 className="w-4 h-4 text-[#4a9cd6]" />
              <span className="text-[#4a9cd6] font-medium uppercase tracking-wider text-sm">Design</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#4a9cd6]" />
          </div>

          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Design That <span className="text-[#4a9cd6]">Inspires</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Every detail of the Skywell ET5 is crafted to create a perfect harmony of form and function, setting new
            standards in electric vehicle design.
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative h-[600px] md:h-[700px] mb-10">
          {/* Main Carousel */}
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={designFeatures[currentSlide].image || "/placeholder.svg"}
                    alt={designFeatures[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-4 mb-6"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#4a9cd6]/30 rounded-xl blur-md" />
                        <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#4a9cd6] to-[#2d7eb3] flex items-center justify-center shadow-lg">
                          {designFeatures[currentSlide].icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#4a9cd6] font-medium text-sm mb-1">
                          {designFeatures[currentSlide].detail}
                        </div>
                        <div className="text-2xl font-bold text-white">{designFeatures[currentSlide].stat}</div>
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                      {designFeatures[currentSlide].title}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="h-1 w-24 bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3] mb-6"
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-200 text-lg mb-8 max-w-2xl"
                    >
                      {designFeatures[currentSlide].description}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4a9cd6] text-white font-medium hover:bg-[#2d7eb3] transition-colors group"
                    >
                      Learn More
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#4a9cd6] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#4a9cd6] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {designFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2 transition-all duration-300 ${
                  currentSlide === index ? "w-12 bg-[#4a9cd6]" : "w-6 bg-gray-400 opacity-50"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-[#4a9cd6] rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {designFeatures.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl h-24 md:h-32 group ${
                currentSlide === index
                  ? "ring-2 ring-[#4a9cd6] ring-offset-2 ring-offset-gray-900"
                  : "opacity-70 hover:opacity-100"
              } transition-all duration-300`}
            >
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#4a9cd6] flex items-center justify-center shrink-0">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-4 h-4 text-white" })}
                </div>
                <p className="text-white text-sm font-medium truncate">{feature.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
