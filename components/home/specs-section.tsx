"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  ArrowRight,
  Zap,
  Battery,
  Timer,
  Car,
  Gauge,
  Maximize,
  Package,
  Monitor,
  Shield,
  Wifi,
  Download,
  BarChart3,
  X,
  User,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react"

export function SpecsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("Performance")
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null)
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Enhanced parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  // Categories with icons
  const categories = [
    { name: "Performance", icon: <Zap className="w-5 h-5" /> },
    { name: "Battery", icon: <Battery className="w-5 h-5" /> },
    { name: "Dimensions", icon: <Maximize className="w-5 h-5" /> },
    { name: "Technology", icon: <Monitor className="w-5 h-5" /> },
  ]

  // Detailed specs data with icons
  const specsData = {
    Performance: [
      {
        name: "Power",
        value: "150 kW (204 PS)",
        highlight: false,
        icon: <Zap className="w-6 h-6 text-white" />,
        detail:
          "The Skywell ET5 delivers impressive power with its advanced electric motor, providing responsive acceleration and smooth driving dynamics.",
        chart: {
          type: "bar",
          value: 75,
          max: 100,
          label: "Power Output",
        },
      },
      {
        name: "Acceleration",
        value: "0-100 km/h in 7.9s",
        highlight: false,
        icon: <Timer className="w-6 h-6 text-white" />,
        detail:
          "Experience quick acceleration from 0 to 100 km/h in just 7.9 seconds, making highway merging and overtaking effortless.",
        chart: {
          type: "bar",
          value: 80,
          max: 100,
          label: "Acceleration",
        },
      },
      {
        name: "Drive Type",
        value: "Front-wheel drive",
        highlight: false,
        icon: <Car className="w-6 h-6 text-white" />,
        detail:
          "The front-wheel drive configuration provides excellent traction and handling in various driving conditions.",
      },
    ],
    Battery: [
      {
        name: "Battery Capacity",
        value: "72 kWh Lithium-ion",
        highlight: true,
        icon: <Battery className="w-6 h-6 text-white" />,
        detail:
          "The high-capacity 72 kWh lithium-ion battery pack is designed for longevity and consistent performance throughout its lifecycle.",
        chart: {
          type: "bar",
          value: 85,
          max: 100,
          label: "Battery Capacity",
        },
      },
      {
        name: "Range",
        value: "520 km (NEDC)",
        highlight: true,
        icon: <Gauge className="w-6 h-6 text-white" />,
        detail:
          "Travel up to 520 km on a single charge (NEDC standard), providing confidence for long journeys without range anxiety.",
        chart: {
          type: "bar",
          value: 90,
          max: 100,
          label: "Range",
        },
      },
      {
        name: "Fast Charging",
        value: "30% to 80% in 30 min",
        highlight: true,
        icon: <Zap className="w-6 h-6 text-white" />,
        detail:
          "With DC fast charging capability, the battery can charge from 30% to 80% in approximately 30 minutes, minimizing downtime on longer trips.",
        chart: {
          type: "bar",
          value: 88,
          max: 100,
          label: "Charging Speed",
        },
      },
    ],
    Dimensions: [
      {
        name: "Dimensions",
        value: "4698×1908×1696 mm",
        highlight: false,
        icon: <Maximize className="w-6 h-6 text-white" />,
        detail:
          "The Skywell ET5's dimensions provide a commanding presence on the road while maintaining excellent maneuverability in urban environments.",
      },
      {
        name: "Cargo Space",
        value: "Up to 1176L",
        highlight: true,
        icon: <Package className="w-6 h-6 text-white" />,
        detail:
          "With seats folded down, enjoy up to 1176 liters of cargo space, providing versatility for everything from shopping to adventure gear.",
        chart: {
          type: "bar",
          value: 82,
          max: 100,
          label: "Cargo Capacity",
        },
      },
      {
        name: "Wheelbase",
        value: "2800 mm",
        highlight: false,
        icon: <Car className="w-6 h-6 text-white" />,
        detail: "The long wheelbase contributes to excellent interior space and a smooth, stable ride quality.",
      },
    ],
    Technology: [
      {
        name: "Infotainment",
        value: "12.8-inch touchscreen",
        highlight: false,
        icon: <Monitor className="w-6 h-6 text-white" />,
        detail:
          "The large 12.8-inch central touchscreen provides intuitive control of vehicle functions, navigation, entertainment, and connectivity features.",
      },
      {
        name: "Driver Assistance",
        value: "Level 2+ autonomous",
        highlight: true,
        icon: <Shield className="w-6 h-6 text-white" />,
        detail:
          "Advanced driver assistance systems provide Level 2+ autonomous capabilities, including adaptive cruise control and lane keeping assistance.",
        chart: {
          type: "bar",
          value: 85,
          max: 100,
          label: "Safety Rating",
        },
      },
      {
        name: "Connectivity",
        value: "OTA updates & app control",
        highlight: false,
        icon: <Wifi className="w-6 h-6 text-white" />,
        detail:
          "Stay connected with over-the-air updates and smartphone app control, allowing remote monitoring and control of vehicle functions.",
      },
    ],
  }

  // Get current specs based on active category
  const currentSpecs = specsData[activeCategory as keyof typeof specsData] || []

  // Toggle expanded spec
  const toggleExpandSpec = (name: string) => {
    if (expandedSpec === name) {
      setExpandedSpec(null)
    } else {
      setExpandedSpec(name)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === "phone") {
      // Only allow digits and limit to 9 characters
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length <= 9) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }



  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine country code with phone number
      const fullPhoneNumber = `+971${formData.phone}`
      
      // Send lead data to API
      const response = await fetch('/api/submit-specs-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        console.log("Lead captured successfully:", result)
        
        // Open PDF in new tab
        window.open('/downloads/Skywell-ET5-Full-Specifications.pdf', '_blank')
        
        // Close modal and reset form
        setShowPdfModal(false)
        setFormData({ fullName: "", phone: "", email: "" })
      } else {
        console.error("Error capturing lead:", result)
        // Still open PDF even if lead capture fails
        window.open('/downloads/Skywell-ET5-Full-Specifications.pdf', '_blank')
        setShowPdfModal(false)
        setFormData({ fullName: "", phone: "", email: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Still open PDF even if there's an error
      window.open('/downloads/Skywell-ET5-Full-Specifications.pdf', '_blank')
      setShowPdfModal(false)
      setFormData({ fullName: "", phone: "", email: "" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle PDF button click
  const handlePdfButtonClick = () => {
    setShowPdfModal(true)
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
          <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 10,0 L 10,10 M 0,10 L 20,10" stroke={isDark ? "white" : "black"} strokeWidth="0.5" fill="none" />
            <circle cx="10" cy="10" r="1.5" fill={brandPrimary} />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#4a9cd6]/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#4a9cd6]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <motion.div
        className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 relative"
        style={{
          opacity,
          y,
        }}
      >
        {/* Section header with creative elements */}
        <div className="relative mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#4a9cd6]" />
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#4a9cd6]/10">
                <BarChart3 className="w-4 h-4 text-[#4a9cd6]" />
                <span className="text-[#4a9cd6] font-medium uppercase tracking-wider text-sm">Specifications</span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#4a9cd6]" />
            </div>

            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Technical <span className="text-[#4a9cd6]">Excellence</span>
            </h2>

            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              The Skywell ET5 combines cutting-edge technology with impressive performance metrics to deliver a premium
              electric SUV experience.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-dashed border-[#4a9cd6]/20 animate-spin-slow pointer-events-none"
            style={{ animationDuration: "30s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-[#4a9cd6]/10 animate-spin-slow pointer-events-none"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          />
        </div>

        {/* Interactive 3D car visualization */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[300px] md:h-[400px] mx-auto max-w-4xl"
          >
            {/* Car image with interactive hotspots */}
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a9cd6]/20 to-transparent rounded-3xl blur-2xl transform -rotate-3" />
              <Image
                src="https://cdn.legendholding.com/images/cdn_6874a7c46c9333.25086062_20250714_064628.png"
                alt="Skywell ET5 Side View"
                fill
                className="object-contain"
                priority
              />

              {/* Interactive hotspots */}
              {[
                { top: "30%", left: "25%", label: "Battery Technology", icon: <Battery className="w-3 h-3" /> },
                { top: "45%", left: "70%", label: "Infotainment System", icon: <Monitor className="w-3 h-3" /> },
                { top: "60%", left: "40%", label: "Electric Motor", icon: <Zap className="w-3 h-3" /> },
              ].map((hotspot, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="absolute cursor-pointer group"
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-[#4a9cd6]/20 animate-ping opacity-75 group-hover:opacity-100" />
                    <div className="relative w-6 h-6 rounded-full bg-[#4a9cd6] flex items-center justify-center text-white z-10 group-hover:scale-110 transition-transform">
                      {hotspot.icon}
                    </div>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#4a9cd6] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      {hotspot.icon}
                      <span>{hotspot.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download specs button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 right-4"
            >
              <button
                onClick={handlePdfButtonClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a9cd6] text-white text-sm font-medium hover:bg-[#2d7eb3] transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>View Full Specs</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4">
          <div
            className="flex space-x-2 p-1 rounded-full bg-opacity-10 backdrop-blur-sm"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.name
                    ? `bg-[${brandPrimary}] text-white shadow-lg`
                    : isDark
                      ? "text-white hover:bg-white/10"
                      : "text-gray-700 hover:bg-black/10"
                }`}
                style={activeCategory === category.name ? { backgroundColor: brandPrimary } : {}}
              >
                <span className={activeCategory === category.name ? "text-white" : "text-[#4a9cd6]"}>
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Specs display with creative layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentSpecs.map((spec) => (
              <motion.div
                key={spec.name}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  expandedSpec === spec.name ? "md:col-span-3" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: expandedSpec === spec.name ? 1 : 1.02 }}
                onMouseEnter={() => setHoveredSpec(spec.name)}
                onMouseLeave={() => setHoveredSpec(null)}
              >
                <div
                  className={`h-full p-6 backdrop-blur-sm transition-all duration-300 ${
                    spec.highlight
                      ? isDark
                        ? "bg-gradient-to-br from-[#4a9cd6]/20 to-[#2d7eb3]/10"
                        : "bg-gradient-to-br from-[#e6f3fc] to-[#d0e8f7]"
                      : isDark
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-black/5 hover:bg-black/10"
                  }`}
                >
                  <div className={`flex items-center justify-between ${expandedSpec === spec.name ? "mb-4" : "mb-0"}`}>
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 mr-4 flex items-center justify-center rounded-xl ${
                          spec.highlight
                            ? "bg-gradient-to-br from-[#4a9cd6] to-[#2d7eb3]"
                            : isDark
                              ? "bg-white/10"
                              : "bg-black/10"
                        }`}
                      >
                        {spec.icon}
                      </div>
                      <div>
                        <h3 className={`text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {spec.name}
                        </h3>
                        <p
                          className={`text-xl font-bold ${
                            spec.highlight ? "text-[#4a9cd6]" : isDark ? "text-white" : "text-black"
                          }`}
                        >
                          {spec.value}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpandSpec(spec.name)}
                      className={`p-2 rounded-full transition-colors ${
                        isDark ? "hover:bg-white/10" : "hover:bg-black/10"
                      }`}
                      aria-label={expandedSpec === spec.name ? "Collapse details" : "Expand details"}
                    >
                      {expandedSpec === spec.name ? (
                        <Minus className="w-5 h-5" style={{ color: brandPrimary }} />
                      ) : (
                        <Plus className="w-5 h-5" style={{ color: brandPrimary }} />
                      )}
                    </button>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedSpec === spec.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-[#4a9cd6]/20 mt-4">
                          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{spec.detail}</p>

                          {/* Performance chart if available */}
                          {spec.chart && (
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                  {spec.chart.label}
                                </span>
                                <span className="text-[#4a9cd6] font-bold">{spec.chart.value}%</span>
                              </div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${spec.chart.value}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full rounded-full bg-gradient-to-r from-[#4a9cd6] to-[#2d7eb3]"
                                ></motion.div>
                              </div>
                            </div>
                          )}


                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover effect */}
                  <AnimatePresence>
                    {hoveredSpec === spec.name && expandedSpec !== spec.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-3 right-3"
                      >
                        <div
                          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                            isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Click to expand</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows for categories */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => {
              const currentIndex = categories.findIndex((cat) => cat.name === activeCategory)
              const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1
              setActiveCategory(categories[prevIndex].name)
            }}
            className={`p-3 rounded-full transition-colors ${
              isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-black"
            }`}
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              const currentIndex = categories.findIndex((cat) => cat.name === activeCategory)
              const nextIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1
              setActiveCategory(categories[nextIndex].name)
            }}
            className={`p-3 rounded-full transition-colors ${
              isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-black"
            }`}
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* PDF Access Modal */}
      <AnimatePresence>
        {showPdfModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPdfModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl ${
                isDark ? "bg-gray-900" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPdfModal(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4a9cd6]/10 flex items-center justify-center">
                  <Download className="w-8 h-8 text-[#4a9cd6]" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Get Full Specifications
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Enter your details to access the complete Skywell ET5 specifications
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#4a9cd6]"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4a9cd6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#4a9cd6]/20`}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Phone Number *
                  </label>
                  <div className="relative flex">
                    {/* Country Code Display */}
                    <div className={`flex items-center px-3 py-3 rounded-l-lg border-r-0 ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}>
                      <span className="text-sm font-medium">+971</span>
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        maxLength={9}
                        className={`w-full pl-10 pr-4 py-3 rounded-r-lg border-l-0 transition-colors ${
                          isDark
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#4a9cd6]"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4a9cd6]"
                        } focus:outline-none focus:ring-2 focus:ring-[#4a9cd6]/20`}
                        placeholder="5X XXX XXXX"
                      />
                    </div>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Enter 9 digits without spaces or special characters
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#4a9cd6]"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4a9cd6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#4a9cd6]/20`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4a9cd6] hover:bg-[#2d7eb3] text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Access Specifications</span>
                    </>
                  )}
                </button>
              </form>

              {/* Privacy notice */}
              <p className={`text-xs text-center mt-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                By submitting this form, you agree to receive communications from Skywell. 
                Your information will be used to provide you with the requested specifications.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
