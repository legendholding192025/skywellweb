"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

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
    <div ref={sectionRef} className="relative w-full min-h-[100svh] overflow-hidden bg-black perspective-1000">
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
          poster="https://cdn.legendholding.com/images/cdn_6874a889c85675.25089476_20250714_064945.jpg"
        >
          <source src="https://cdn.legendholding.com/videos/video_cdn_68749be1932315.27786609_20250714_055545.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Overlay to darken video slightly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1]"></div>

      {/* Content with parallax effect */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-[100svh] px-4 text-white"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto md:mx-0 space-y-6 md:space-y-8">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              SKYWELL
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Brought to you by <span className="text-[#4a9cd6]">Legend Motors</span>
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Experience the next generation of sustainable transportation, with Skywell ET5.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {/* Primary Button with Enhanced Styling */}
              <Link href="/models/et5" className="w-full sm:w-auto">
                <motion.div
                  className="relative w-full sm:w-auto"
                  onMouseEnter={() => setIsPrimaryHovered(true)}
                  onMouseLeave={() => setIsPrimaryHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-[#4a9cd6] rounded-md blur-md opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                  <button className="relative w-full sm:w-auto bg-gradient-to-r from-[#4a9cd6] to-[#3a8cc6] text-white font-medium px-6 py-3 sm:py-2.5 rounded-md text-base sm:text-sm shadow-lg flex items-center justify-center overflow-hidden group z-10">
                    <span className="relative z-10 flex items-center">
                      Explore ET5
                      <motion.div animate={{ x: isPrimaryHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3a8cc6] to-[#4a9cd6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </motion.div>
              </Link>

              {/* Secondary Button with Enhanced Styling */}
              <Link href="/test-drive" className="w-full sm:w-auto">
                <motion.div
                  className="relative w-full sm:w-auto"
                  onMouseEnter={() => setIsSecondaryHovered(true)}
                  onMouseLeave={() => setIsSecondaryHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="relative w-full sm:w-auto bg-transparent border-2 border-white text-white font-medium px-6 py-3 sm:py-2 rounded-md text-base sm:text-sm flex items-center justify-center overflow-hidden group">
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
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm text-gray-300 mb-2">Scroll to explore</span>
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2"
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
