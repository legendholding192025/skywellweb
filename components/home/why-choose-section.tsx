"use client"

import React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Zap, Shield, Leaf, Award, Clock, HeartHandshake, ChevronRight, CheckCircle, BarChart3 } from "lucide-react"

export function WhyChooseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
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

  // Key benefits data
  const benefits = [
    {
      title: "Cutting-Edge Technology",
      description:
        "Experience the future of mobility with Skywell's advanced electric powertrain, smart connectivity, and autonomous driving features.",
      icon: <Zap className="w-6 h-6 text-white" />,
      stats: ["150kW Power", "520km Range", "Level 2+ Autonomy"],
    },
    {
      title: "Exceptional Safety",
      description:
        "Drive with confidence knowing your Skywell is equipped with comprehensive safety systems and has achieved top safety ratings.",
      icon: <Shield className="w-6 h-6 text-white" />,
      stats: ["5★ Safety Rating", "8 Airbags", "360° Cameras"],
    },
    {
      title: "Sustainability Commitment",
      description:
        "Choose a cleaner future with Skywell's zero-emission vehicles and eco-friendly manufacturing processes.",
      icon: <Leaf className="w-6 h-6 text-white" />,
      stats: ["Zero Emissions", "Recycled Materials", "Carbon Neutral Factory"],
    },
    {
      title: "Award-Winning Design",
      description:
        "Stand out with Skywell's distinctive styling that combines elegance, functionality, and aerodynamic efficiency.",
      icon: <Award className="w-6 h-6 text-white" />,
      stats: ["Red Dot Award", "0.28 Drag Coefficient", "Premium Finishes"],
    },
    {
      title: "Exceptional Value",
      description:
        "Enjoy premium features, performance, and quality at a competitive price point with lower total cost of ownership.",
      icon: <Clock className="w-6 h-6 text-white" />,
      stats: ["Competitive Pricing", "Low Maintenance", "High Residual Value"],
    },
    {
      title: "Superior Customer Experience",
      description:
        "Benefit from Skywell's dedicated customer service, comprehensive warranty, and growing service network.",
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
      stats: ["8-Year Battery Warranty", "24/7 Support", "Nationwide Service"],
    },
  ]

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden py-20 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit board pattern */}
        <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="why-choose-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 10,0 L 10,10 M 0,10 L 20,10" stroke={isDark ? "white" : "black"} strokeWidth="0.5" fill="none" />
            <circle cx="10" cy="10" r="1.5" fill={brandPrimary} />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#why-choose-pattern)" />
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
        }}
      >
        {/* Section Header */}
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
              <span className="text-[#4a9cd6] font-medium uppercase tracking-wider text-sm">Why Skywell</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#4a9cd6]" />
          </div>

          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Why Choose <span className="text-[#4a9cd6]">Skywell</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Discover the compelling reasons why Skywell is the smart choice for your electric vehicle journey.
          </p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden"
          >
            <Image src="https://res.cloudinary.com/dckrspiqe/image/upload/v1745843638/Skywell-et5-lr-10_result_c7w5j6.jpg" alt="Skywell Showroom" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
          </motion.div>

          {/* Right Column - Key Benefits */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl ${
                isDark
                  ? "bg-gradient-to-br from-[#4a9cd6]/20 to-[#2d7eb3]/10"
                  : "bg-gradient-to-br from-[#e6f3fc] to-[#d0e8f7]"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9cd6] to-[#2d7eb3] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Award-Winning Excellence
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Recognized for innovation and quality
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {["Design Excellence", "Safety Innovation", "Customer Satisfaction", "Eco-Friendly"].map(
                  (award, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
                        isDark ? "bg-white/10 text-white" : "bg-white text-gray-800"
                      }`}
                    >
                      {award}
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl ${
                isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-bold mb-3">Join the Electric Revolution</h3>
              <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Experience the perfect blend of performance, technology, and sustainability with Skywell's innovative
                electric vehicles.
              </p>
              <Link href="/test-drive">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a9cd6] text-white font-medium hover:bg-[#2d7eb3] transition-colors group">
                  Book a Test Drive
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl p-6 border transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white border-gray-200 hover:border-[#4a9cd6]/30"
              } hover:shadow-lg`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#4a9cd6]/20 rounded-lg blur-lg transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-[#4a9cd6] to-[#2d7eb3] flex items-center justify-center text-white shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"} group-hover:text-[#4a9cd6] transition-colors`}
                  >
                    {benefit.title}
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-[#4a9cd6]/30 to-transparent mb-3" />
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{benefit.description}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {benefit.stats.map((stat, statIndex) => (
                  <div
                    key={statIndex}
                    className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a9cd6]" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 transform translate-x-8 translate-y-8">
                {React.cloneElement(benefit.icon as React.ReactElement, { className: "w-full h-full" })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className={`mt-16 p-8 rounded-3xl relative overflow-hidden ${
            isDark ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-100 to-white"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4a9cd6]/10 rounded-full blur-[100px] transform translate-x-1/4 -translate-y-1/4" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Ready to Experience <span className="text-[#4a9cd6]">Skywell</span>?
              </h3>
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Visit your nearest Skywell dealership for a test drive and discover why more drivers are making the
                switch to our innovative electric vehicles.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/test-drive">
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    Book a Test Drive
                    <ChevronRight className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
                <button
                  className={`px-6 py-3 rounded-full font-medium ${
                    isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/5 text-gray-900 hover:bg-black/10"
                  } transition-colors`}
                >
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative w-full md:w-1/3 aspect-square max-w-[300px]">
              <Image src="https://res.cloudinary.com/dckrspiqe/image/upload/v1745844359/skywell-logo_yfkg37.svg" alt="Skywell Logo" fill className="object-contain" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
