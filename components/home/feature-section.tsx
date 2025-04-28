"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"

export function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Parallax effects
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1])
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [5, 0])
  const imageZ = useTransform(scrollYProgress, [0, 0.5], [-50, 50])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const textX = useTransform(scrollYProgress, [0.1, 0.4], [100, 0])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const textZ = useTransform(scrollYProgress, [0.1, 0.4], [-50, 50])

  // Feature icons parallax
  const icon1Y = useTransform(scrollYProgress, [0.4, 0.8], [50, -20])
  const icon2Y = useTransform(scrollYProgress, [0.4, 0.8], [70, -30])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center overflow-hidden perspective-1000 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image with 3D parallax effect */}
          <motion.div
            className="relative"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              rotateY: imageRotateY,
              z: imageZ,
            }}
          >
            <div className="relative h-[300px] md:h-[500px] w-full">
              <Image
                src="/images/sideview.png"
                alt="Skywell ET5"
                fill
                className={`object-contain ${!isDark ? "filter brightness-90" : ""}`}
              />
            </div>
          </motion.div>

          {/* Text content with parallax effect */}
          <motion.div
            className={isDark ? "text-white" : "text-black"}
            style={{
              x: textX,
              opacity: textOpacity,
              z: textZ,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Exceptional Range</h2>
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${isDark ? "text-white/80" : "text-black/80"}`}>
              Experience the freedom of the open road with up to 500km of range on a single charge. The advanced battery
              technology ensures you spend less time charging and more time driving.
            </p>
            <div className="flex flex-col gap-6">
              <motion.div className="flex items-center gap-4" style={{ y: icon1Y }}>
                <div className="bg-[#4a9cd6] h-12 w-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Fast Charging</h3>
                  <p className={isDark ? "text-white/70" : "text-black/70"}>80% in just 30 minutes</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center gap-4" style={{ y: icon2Y }}>
                <div className="bg-[#4a9cd6] h-12 w-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium">Long-lasting Battery</h3>
                  <p className={isDark ? "text-white/70" : "text-black/70"}>10-year battery warranty</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
