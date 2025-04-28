"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black perspective-1000">
      {/* Video Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: videoScale,
          y: videoY,
        }}
      >
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/dckrspiqe/video/upload/v1745844235/hero-background_usdzyq.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Overlay to darken video slightly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1]"></div>

      {/* Content with parallax effect */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-white"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-xl mx-auto md:mx-0">
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Skywell ET5
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl font-medium mb-6 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Drive the <span className="text-[#4a9cd6]">Electric</span> Revolution
            </motion.p>

            <motion.p
              className="text-xl text-gray-300 mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Experience the next generation of sustainable transportation with Skywell's innovative electric vehicles.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {/* Primary Button with Enhanced Styling */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-[#4a9cd6] rounded-md blur-md opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <button className="relative bg-gradient-to-r from-[#4a9cd6] to-[#3a8cc6] text-white font-medium px-6 py-2.5 rounded-md text-sm shadow-lg flex items-center justify-center overflow-hidden group z-10">
                  <span className="relative z-10 flex items-center">
                    Explore Models
                    <motion.div animate={{ x: isPrimaryHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3a8cc6] to-[#4a9cd6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </motion.div>

              {/* Secondary Button with Enhanced Styling */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsSecondaryHovered(true)}
                onMouseLeave={() => setIsSecondaryHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="relative bg-transparent border-2 border-white text-white font-medium px-6 py-2 rounded-md text-sm flex items-center justify-center overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Book a Test Drive
                    <motion.div
                      animate={{ x: isSecondaryHovered ? 5 : 0, opacity: isSecondaryHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
